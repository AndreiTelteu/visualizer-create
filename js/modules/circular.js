export default class CircularBars {
    static get moduleName() {
        return "CircularBars";
    }

    constructor() {
        this.amount = 100;

        this.inward = false;
        this.totalAngle = 360;
        this.autoRotate = false;

        this.secondaryColor = "#ba88bf";
    }

    update(t, vis, freqs) {
        vis.cls();
        // convert from degrees to radians
        const angle = (this.totalAngle * (vis.P / 180)) / this.amount;

        const radius = vis.w / 8;
        const lineWidth = vis.w / 300;
        const height = vis.w / 200;

        const intrude = vis.w / 100;
        const arcIntrude = 40;

        // fill background
        vis.x.fillStyle = "#001027";
        vis.x.fillRect(0, 0, vis.w, vis.h);

        vis.x.fillStyle = this.secondaryColor;
        vis.x.strokeStyle = this.secondaryColor;

        // vis.x.save();
        vis.x.translate(vis.w / 2, vis.h / 2);
        for (let i = 0; i < this.amount; i++) {
            vis.x.rotate(angle);
            const x = this.inward ? -radius : radius;
            if (i !== 0 && i % 3 === 0) {
                vis.x.fillRect(x - intrude, -(height / 2), Math.max(freqs[i] / 2, 5), height);
            } 
            else {
                vis.x.fillRect(x, -(height / 2), Math.max(freqs[i] / 2, 5), height);
            }
        }
        // vis.x.restore();

        vis.x.translate(-vis.w / 2, -vis.h / 2);

        let avg = 0;
        for (let i = 0; i < this.amount; i++) {avg += freqs[i]}
        avg /= this.amount;

        vis.x.translate(vis.w / 2, vis.h / 2);
        vis.x.beginPath();
        vis.x.arc(0, 0, Math.max(Math.min((avg / 255) * radius, radius - arcIntrude), 20), 0, vis.P2);
        vis.x.closePath();
        vis.x.lineWidth = lineWidth;
        vis.x.stroke();
        vis.x.translate(-vis.w / 2, -vis.h / 2);

        if (this.autoRotate) {
            this.totalAngle++;
            if (this.totalAngle > 100000) {
                this.totalAngle = 720;
            }
        }
    }
}
