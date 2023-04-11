import Position, {
  OMIT_POSITION_ATTRIBUTES,
  PositionAttributes
} from '@/models/position';
import Helper from '@/utils/helper';
import { AppResponse } from '@/utils/types';
import { BaseService } from './base.service';

class PositionService extends BaseService<Position, PositionAttributes> {
  getModel() {
    return Position;
  }

  async create(payload: PositionAttributes): Promise<AppResponse<Position>> {
    const newPosition = await Position.create(
      Helper.omit(payload, OMIT_POSITION_ATTRIBUTES)
    );
    return {
      data: newPosition,
      code: 201
    };
  }
}

export default new PositionService();
