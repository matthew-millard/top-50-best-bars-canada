function removeProtocol(url) {
  return url.replace(/^(https?:\/\/)/, '');
}

module.exports = removeProtocol;
