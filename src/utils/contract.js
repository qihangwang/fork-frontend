class Contract {
  constructor(abi, address, name) {
    this.name = name;
    this.abi = abi;
    this.address = address;
    this.contract = window.web3js ? new web3js.eth.Contract(abi, address) : undefined;
  }
  call(method, methodParms, ...args) {
    if (methodParms !== undefined && methodParms !== false) {
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
  allowance(account, address, ...args) {
    return this.contract.methods.allowance(account, address).call(...args);
  }
  approve(address, approveVal, ...args) {
    return this.contract.methods.approve(address, approveVal).send(...args);
  }
  getBalance(account, address) {
    return this.call('balanceOf', account, { form: address });
  }
  totalSupply() {
    return this.call('totalSupply');
  }
}

export default Contract;
