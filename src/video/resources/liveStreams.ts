/*!
 * Mux Live Streams
 * Copyright(c) 2018 Mux Inc.
 */
import { Base } from '../../base.js';
import {
  CreateLiveStreamParams,
  CreatePlaybackIdParams,
  ListLiveStreamParams,
  LiveStream,
  PlaybackId,
  SimulcastTarget,
  SimulcastTargetParams,
  UpdateLiveStreamEmbeddedSubtitlesParams,
  UpdateLiveStreamParams,
} from '../domain.js';

/**
 * @private Base live stream path for the Mux API
 * */
const PATH = '/video/v1/live-streams';

/**
 * @private
 * Build the base live stream path for the Mux API
 * */
const buildBasePath = (liveStreamId: string) => `${PATH}/${liveStreamId}`;

/**
 * Live Streams Class - Provides access to the Mux Video Live Streams API
 *
 * @extends Base
 * @example
 * const muxClient = new Mux(accessToken, secret);
 * const { Video } = muxClient;
 *
 * // Create a live stream
 * Video.LiveStreams.create({
 *  playback_policy: 'public',
 *  new_asset_settings: { playback_policy: 'public' }
 * });
 */
export class LiveStreams extends Base {
  /**
   * Creates a Mux live stream with the specified JSON parameters
   * @param {Object} params - Live Stream JSON parameters
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const muxClient = new Mux(accessToken, secret);
   * const { Video } = muxClient;
   *
   * // Create a live stream
   * Video.LiveStreams.create({
   *  playback_policy: 'public',
   *  new_asset_settings: { playback_policy: 'public' }
   * });
   *
   * @see https://docs.mux.com/api-reference/video#operation/create-live-stream
   */
  create(params: CreateLiveStreamParams): Promise<LiveStream> {
    return this.http.post(PATH, params);
  }

  /**
   * Updates an existing livestream with new parameters.
   *
   * @param {string} liveStreamId - the ID of the live stream
   * @param {Object} params - Live Stream JSON parameters (e.g playback_policy)
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   */
  async update(
    liveStreamId: string,
    params: UpdateLiveStreamParams
  ): Promise<LiveStream> {
    if (!liveStreamId || !params) {
      throw new Error('assetId and params are required.');
    }

    return this.http.patch(buildBasePath(liveStreamId), params);
  }

  /**
   * Deletes a Mux Live Stream
   * @param {string} liveStreamId - The ID for the live stream intended for deletion
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Delete a mux live stream
   * Video.LiveStreams.del(liveStreamId);
   *
   * @see https://docs.mux.com/api-reference/video#operation/delete-live-stream
   */
  del(liveStreamId: string): Promise<any> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to delete a live stream')
      );
    }
    return this.http.delete(buildBasePath(liveStreamId));
  }

  /**
   * Get an Live Stream
   * @param {string} liveStreamId - The ID for the live stream
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Get a live stream
   * Video.LiveStreams.get(liveStreamId);
   *
   * @see https://docs.mux.com/api-reference/video#operation/get-live-stream
   */
  get(liveStreamId: string): Promise<LiveStream> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to get a live stream')
      );
    }
    return this.http.get(buildBasePath(liveStreamId));
  }

  /**
   * List all live streams for a Mux Environment (tied to your access token)
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // List all live streams for a Mux Environment
   * Video.LiveStreams.list();
   *
   * @see https://docs.mux.com/api-reference/video#operation/list-live-streams
   */
  list(params: ListLiveStreamParams): Promise<Array<LiveStream>> {
    return this.http.get(PATH, { params });
  }

  /**
   * Signal a live stream is finished
   * @param {string} liveStreamId - The ID for the live stream
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Signal a live stream is finished
   * Video.LiveStreams.signalComplete(liveStreamId);
   *
   * @see https://docs.mux.com/api-reference/video#operation/signal-live-stream-complete
   */
  signalComplete(liveStreamId: string): Promise<any> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to signal a stream is complete')
      );
    }
    return this.http.put(`${buildBasePath(liveStreamId)}/complete`);
  }

  /**
   * Reset a stream key
   * @param {string} liveStreamId - The ID for the live stream
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Reset a live stream key if you want to immediately stop the current stream key
   * // from working and create a new stream key that can be used for future broadcasts.
   * Video.LiveStreams.resetStreamKey(liveStreamId);
   *
   * @see https://docs.mux.com/api-reference/video#operation/reset-stream-key
   */
  resetStreamKey(liveStreamId: string): Promise<LiveStream> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to reset a live stream key')
      );
    }
    return this.http.post(`${buildBasePath(liveStreamId)}/reset-stream-key`);
  }

  /**
   * Create a live stream playback id
   * @param {string} liveStreamId - The ID for the live stream
   * @param {Object} params - Live Stream JSON parameters (e.g playback_policy)
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Create a live stream playback ID
   * Video.LiveStreams.createPlaybackId(liveStreamId, { policy: 'public' });
   *
   * @see https://docs.mux.com/api-reference/video#operation/create-live-stream-playback-id
   */
  createPlaybackId(
    liveStreamId: string,
    params: CreatePlaybackIdParams
  ): Promise<PlaybackId> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error(
          'A live stream ID is required to create a live stream playback ID'
        )
      );
    }

    if (!params) {
      return Promise.reject(
        new Error(
          'A playback policy is required to create a live stream playback ID'
        )
      );
    }
    return this.http.post(
      `${buildBasePath(liveStreamId)}/playback-ids`,
      params
    );
  }

  /**
   * Delete a live stream playback ID
   * @param {string} liveStreamId - The ID for the live stream
   * @param {string} playbackId - The ID for the live stream playback ID to delete
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Delete a live stream playback ID
   * Video.LiveStreams.deletePlaybackId(liveStreamId, { policy: 'public' });
   *
   * @see https://docs.mux.com/api-reference/video#operation/delete-live-stream-playback-id
   */
  deletePlaybackId(liveStreamId: string, playbackId: string): Promise<any> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error(
          'A live stream ID is required to delete a live stream playback ID'
        )
      );
    }

    if (!playbackId) {
      return Promise.reject(
        new Error(
          'A live stream playback ID is required to delete a live stream playback ID'
        )
      );
    }
    return this.http.delete(
      `${buildBasePath(liveStreamId)}/playback-ids/${playbackId}`
    );
  }

  /**
   * Return a live stream playback id
   * @param {string} liveStreamId - The ID for the live stream
   * @param {string} playbackId - The ID for the playbackId
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @see https://docs.mux.com/api-reference/video#operation/get-asset-playback-id
   */
  playbackId(liveStreamId: string, playbackId: string): Promise<PlaybackId> {
    if (!liveStreamId) {
      return Promise.reject(new Error('A live stream ID is required'));
    }

    if (!playbackId) {
      return Promise.reject(new Error('A playback ID is required'));
    }
    return this.http.get(
      `${buildBasePath(liveStreamId)}/playback-ids/${playbackId}`
    );
  }

  /**
   * Create a simulcast target
   * @param {string} liveStreamId - The ID for the live stream
   * @param {Object} params - Simulcast Target JSON parameters (e.g url and stream_key)
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Create a live simulcast target
   * Video.LiveStreams.createSimulcastTarget(liveStreamId, {url: 'rtmp://live.example.com/app', stream_key: 'difvbfgi', passthrough: 'Example Live Streaming service'});
   *
   * @see https://docs.mux.com/api-reference/video#operation/create-live-stream-simulcast-target
   */
  createSimulcastTarget(
    liveStreamId: string,
    params: SimulcastTargetParams
  ): Promise<SimulcastTarget> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to create a simulcast target')
      );
    }

    if (!(params && params.url)) {
      return Promise.reject(
        new Error('A url is required to create a simulcast target')
      );
    }
    return this.http.post(
      `${buildBasePath(liveStreamId)}/simulcast-targets`,
      params
    );
  }

  /**
   * Get a simulcast target
   * @param {string} liveStreamId - The ID for the live stream
   * @param {string} simulcastTargetId - The ID for the simulcast target to delete
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Get a live simulcast target
   * Video.LiveStreams.getSimulcastTarget(liveStreamId, simulcastTargetId);
   *
   * @see https://docs.mux.com/api-reference/video#operation/get-live-stream-simulcast-target
   */
  getSimulcastTarget(
    liveStreamId: string,
    simulcastTargetId: string
  ): Promise<SimulcastTarget> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to get a simulcast target')
      );
    }

    if (!simulcastTargetId) {
      return Promise.reject(
        new Error('A simulcast target ID is required to get a simulcast target')
      );
    }
    return this.http.get(
      `${buildBasePath(liveStreamId)}/simulcast-targets/${simulcastTargetId}`
    );
  }

  /**
   * Delete a simulcast target
   * @param {string} liveStreamId - The ID for the live stream
   * @param {string} simulcastTargetId - The ID for the simulcast target to delete
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Delete a simulcast target
   * Video.LiveStreams.deleteSimulcastTarget(liveStreamId, simulcastTargetId);
   *
   * @see https://docs.mux.com/api-reference/video#operation/delete-live-stream-simulcast-target
   */
  deleteSimulcastTarget(
    liveStreamId: string,
    simulcastTargetId: string
  ): Promise<any> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to delete a simulcast target')
      );
    }

    if (!simulcastTargetId) {
      return Promise.reject(
        new Error(
          'A simulcast target ID is required to delete a simulcast target'
        )
      );
    }
    return this.http.delete(
      `${buildBasePath(liveStreamId)}/simulcast-targets/${simulcastTargetId}`
    );
  }

  /**
   * Configures a live stream to receive embedded closed captions.
   * The resulting Asset's subtitle text track will have `closed_captions: true` set.
   * @param {string} liveStreamId - The ID for the live stream
   * @param {string} params - Embedded subtitles parameters.
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   */
  async updateEmbeddedSubtitles(
    liveStreamId: string,
    params: UpdateLiveStreamEmbeddedSubtitlesParams
  ): Promise<LiveStream> {
    if (!liveStreamId || !params) {
      throw new Error('liveStreamId and params are required.');
    }

    return this.http.put(
      `${buildBasePath(liveStreamId)}/embedded-subtitles`,
      params
    );
  }

  /**
   * Disable a Live Stream
   * @param {string} liveStreamId - The ID for the live stream
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Disable a live stream
   * Video.LiveStreams.disable(liveStreamId);
   *
   * @see https://docs.mux.com/api-reference/video#operation/disable-live-stream
   */
  disable(liveStreamId: string): Promise<any> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to disable a live stream')
      );
    }
    return this.http.put(`${buildBasePath(liveStreamId)}/disable`);
  }

  /**
   * Enable a Live Stream
   * @param {string} liveStreamId - The ID for the live stream
   * @returns {Promise} - Returns a resolved Promise with a response from the Mux API
   *
   * @example
   * const { Video } = new Mux(accessToken, secret);
   *
   * // Enable a Live Stream
   * Video.LiveStreams.enable(liveStreamId);
   *
   * @see https://docs.mux.com/api-reference/video#operation/enable-live-stream
   */
  enable(liveStreamId: string): Promise<any> {
    if (!liveStreamId) {
      return Promise.reject(
        new Error('A live stream ID is required to enable a live stream')
      );
    }
    return this.http.put(`${buildBasePath(liveStreamId)}/enable`);
  }
}
