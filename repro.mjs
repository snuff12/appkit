import { HelpersUtil } from '@reown/appkit-utils';

const unhandled = [];
const onUnhandled = error => unhandled.push(error.message);
process.on('unhandledRejection', onUnhandled);

let state = 'pending';
HelpersUtil.withRetry({
  conditionFn: async () => { throw new Error('temporary condition error'); },
  intervalMs: 5,
  maxRetries: 3
}).then(
  () => { state = 'resolved'; },
  error => { state = `rejected: ${error.message}`; }
);

await new Promise(resolve => setTimeout(resolve, 150));
console.log(JSON.stringify({ publicPromise: state, escapedErrors: unhandled }, null, 2));
process.off('unhandledRejection', onUnhandled);
// Exit 1 demonstrates the bug in the pinned published package.
process.exitCode = state === 'pending' || unhandled.length ? 1 : 0;
