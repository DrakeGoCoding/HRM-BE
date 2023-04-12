import Position, {
  OMIT_POSITION_ATTRIBUTES,
  PositionAttributes
} from '@/models/position';
import { BaseService } from './base.service';

class PositionService extends BaseService<Position, PositionAttributes> {
  constructor() {
    super(Position, OMIT_POSITION_ATTRIBUTES);
  }
}

export default new PositionService();
