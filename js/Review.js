function Review(idmessages) {
    Container.call(this, idmessages);

    this.id_user = 0;
    this.id_comment = 0;
    this.text = '';
    this.moderFlag = false;
}

Review.prototype = Object.create(Container.prototype);
Review.prototype.constructor = Review;

