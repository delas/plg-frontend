export default class PlgBackend {
    constructor() {
        this.urls = require('../assets/backend-hosts.json');
        this.url = "";
        this.getRandomURL();
    }

    getRandomURL() {
        var urls = this.getAllURLs();
        this.url = urls[Math.floor(Math.random() * urls.length)];
    }

    getAllURLs() {
        return this.urls;
    }

    getHostname() {
        return this.url["hostname"];
    }

    getProtocol() {
        return this.url["protocol"];
    }

    getUrl() {
        return this.getProtocol() + "://" + this.getHostname();
    }

    getUrlPing() {
        return this.getUrl() + "/api/v2/system/ping";
    }

    getUrlProcessRandomize() {
        return this.getUrl() + "/api/v2/process/randomize";
    }

    getUrlProcessPlg2Dot() {
        return this.getUrl() + "/api/v2/process/plg2dot";
    }

    getUrlProcessPlg2Bpmn() {
        return this.getUrl() + "/api/v2/process/plg2bpmn";
    }

    getUrlProcessPlg2Tpn() {
        return this.getUrl() + "/api/v2/process/plg2tpn";
    }

    getUrlProcessPlg2Pnml() {
        return this.getUrl() + "/api/v2/process/plg2pnml";
    }

    getUrlStreamerStatus(processId) {
        return this.getUrl() + "/api/v2/streamer/status/" + processId;
    }

    getUrlStreamerStart(processId) {
        return this.getUrl() + "/api/v2/streamer/start/" + processId;
    }
}
