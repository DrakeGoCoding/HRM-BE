import Profile, {
  OMIT_PROFILE_ATTRIBUTES,
  ProfileAttributes
} from '@/models/profile';
import Helper from '@/utils/helper';
import { AppResponse } from '@/utils/types';
import { BaseService } from './base.service';

class ProfileService extends BaseService<Profile, ProfileAttributes> {
  getModel() {
    return Profile;
  }

  async create(payload: ProfileAttributes): Promise<AppResponse<Profile>> {
    const newProfile = await Profile.create(
      Helper.omit(payload, OMIT_PROFILE_ATTRIBUTES)
    );
    return {
      data: newProfile,
      code: 201
    };
  }
}

export default new ProfileService();
