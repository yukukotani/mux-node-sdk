import { CreateAssetParams } from './CreateAssetParams';

export interface CreateUploadParams {
  timeout?: string;
  cors_origin?: string;
  new_asset_settings?: CreateAssetParams;
  test?: boolean;
}
