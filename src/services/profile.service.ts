import Profile, {
  OMIT_PROFILE_ATTRIBUTES,
  ProfileAttributes
} from '@/models/profile';
import { BaseService } from './base.service';

class ProfileService extends BaseService<Profile, ProfileAttributes> {
  constructor() {
    super(Profile, OMIT_PROFILE_ATTRIBUTES);
  }
}

export default new ProfileService();
