function Container(id) {
    this.id = id;
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

//TODO: ДЗ
Container.prototype.remove = function () {

};