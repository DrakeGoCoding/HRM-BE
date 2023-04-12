import { BaseController } from './base.controller';
import Position, { PositionAttributes } from '@/models/position';
import { positionService } from '@/services';

class PositionController extends BaseController<Position, PositionAttributes> {
  constructor() {
    super(positionService);
  }
}

export default new PositionController();
