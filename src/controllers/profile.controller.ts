import { BaseController } from './base.controller';
import Profile, { ProfileAttributes } from '@/models/profile';
import { profileService } from '@/services';

class ProfileController extends BaseController<Profile, ProfileAttributes> {
  constructor() {
    super(profileService);
  }
}

export default new ProfileController();
