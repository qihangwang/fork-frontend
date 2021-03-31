class Contract {
  constructor(abi, address, name) {
    this.name = name;
    this.abi = abi;
    this.address = address;
    this.contract = window.web3js ? new web3js.eth.Contract(abi, address) : undefined;
  }
  // 支持调用call 函数方法传递多个参数 methodParms为字符串或数组
  call(method, methodParms, ...args) {
    if (methodParms) {
      if (Array.isArray(methodParms)) {
        return this.contract.methods[method](...methodParms).call(...args);
      }
      return this.contract.methods[method](methodParms).call(...args);
    }
    return this.contract.methods[method]().call(...args);
  }
  send(method, methodParms, ...args) {
    if (methodParms) {
      if (Array.isArray(methodParms)) {
        return this.contract.methods[method](...methodParms).send(...args);
      }
      return this.contract.methods[method](methodParms).send(...args);
    }
    return this.contract.methods[method]().send(...args);
  }
  // 检查是否授权
  allowance(account, address, ...args) {
    return this.contract.methods.allowance(account, address).call(...args);
  }
  // 进行授权 地址 额度
  approve(address, approveVal, ...args) {
    return this.contract.methods.approve(address, approveVal).send(...args);
  }
  // 查询该合约下账户多少余额
  getBalance(account, address) {
    return this.call('balanceOf', account, { form: address });
  }
  totalSupply() {
    return this.call('totalSupply');
  }
}

export default Contract;
