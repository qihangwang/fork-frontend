import { Message, Notification } from 'element-ui';

import '../less/element.less';

const common = async function(fun1, ...args) {
  const loadingMessage = Message({
    duration: 0,
    iconClass: 'loading-icon animate-loading',
    customClass: 'custom-message',
    dangerouslyUseHTMLString: true,
    message: '<p><span>Making transaction... </span></p>',
  });
  let transtionMessage = '';
  try {
    const result = await fun1(res => {
      loadingMessage.close();
      transtionMessage = Message({
        duration: 0,
        iconClass: 'loading-icon animate-loading',
        customClass: 'custom-message',
        dangerouslyUseHTMLString: true,
        message:
          '<span>Transaction has been sent and confirmation is in progress.' +
          'Check your transaction on bscscan ' +
          `<a class="green" target="_blank" href="https://testnet.bscscan.com/tx/${res}">here</a>.</span>`,
      });
    }, ...args);
    if (result) {
      transtionMessage.close();
      Notification({
        title: 'Success Transtion',
        dangerouslyUseHTMLString: true,
        message: `<a target="_blank" class="green notify-a"  target="_blank" href="https://testnet.bscscan.com/tx/${result.transactionHash}">View on Bscscan</a>`,
        type: 'success',
        duration: 10000,
      });
      return result;
    }
    return undefined;
  } catch (err) {
    loadingMessage.close();
    Message({
      duration: 5000,
      type: 'error',
      customClass: 'custom-message',
      message: err.reason || err.message || err,
    });
    return false;
  }
};
export { common };
