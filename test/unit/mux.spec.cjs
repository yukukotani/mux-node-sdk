/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const { expect } = require('chai');
const { Mux } = require('../../cjs/mux');
const MuxVideo = require('../../cjs/video/video').Video;
const MuxData = require('../../cjs/data/data').Data;

/** @test {Mux} */
describe('Unit::Mux', () => {
  /** @test {Mux} */
  describe('Mux', () => {
    /** @test {Mux} */
    it('exposes Mux Video and Data as instance methods', () => {
      const muxClient = new Mux('testKey', 'testSecret');
      const { Video, Data } = muxClient;
      expect(Video).to.to.be.an.instanceof(MuxVideo);
      expect(Data).to.to.be.an.instanceof(MuxData);
    });

    /** @test {Mux.JTW} */
    it('exposes JWT Helper utilities as static methods', () => {
      expect(Mux.JWT.sign).to.be.a('function');
      expect(Mux.JWT.decode).to.be.a('function');
    });

    /** @test {Mux.Webhooks} */
    it('exposes Webhooks.verifyHeader', () => {
      expect(Mux.Webhooks.verifyHeader).to.be.a('function');
    });

    // no no-arg/one-arg test here because the they rely on env vars and breaks test parallelism to fiddle with

    it('instantiates with two args', () => {
      const m = new Mux('token', 'secret');

      expect(m._tokenId).to.be.eq('token');
      expect(m._tokenSecret).to.be.eq('secret');
    });

    it('instantiates with three args', () => {
      const m = new Mux('token', 'secret', {});

      expect(m._tokenId).to.be.eq('token');
      expect(m._tokenSecret).to.be.eq('secret');
    });
  });
});
