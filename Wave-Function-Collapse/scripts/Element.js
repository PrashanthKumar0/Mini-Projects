class Element {
    constructor(image_src, edges) {
        this.image_src = image_src;
        this.edges = edges;
        this.image = new Image();
    }
    load() {
        return new Promise((resolve, reject) => {
            this.image.src = this.image_src;
            this.image.onload = () => {
                resolve(this.image_src);
            }
            this.image.onerrr = () => {
                reject(this.image_src);
            }
        });
    }
    draw(ctx, x, y, w) {
        let inv_ar = this.image.height / this.image.width;
        let h = (inv_ar) * w;
        ctx.drawImage(this.image, x, y, w, h);
    }
}