import { ISelectItem } from '../components/MUISelect/MUISelect';
import { CharacterOrderBy, ICharacterFilterParams, IPageFilterParams } from '../types/api';

export const DEFAULT_ORDER_BY_PARAM_VALUE: CharacterOrderBy = CharacterOrderBy.dateDesc;

export const orderByParams: ICharacterFilterParams = {
  orderBy: DEFAULT_ORDER_BY_PARAM_VALUE
};

export const pageRestrictions: IPageFilterParams = {
  limit: 12,
  offset: 0
};

export const orderByItems: Array<ISelectItem<CharacterOrderBy>> = [
  {
    value: CharacterOrderBy.name,
    text: 'name'
  },
  {
    value: CharacterOrderBy.nameDesc,
    text: 'name DESC'
  },
  {
    value: CharacterOrderBy.date,
    text: 'date'
  },
  {
    value: CharacterOrderBy.dateDesc,
    text: 'date DESC'
  }
];

export const DEFAULT_PAGE_NUMBER = 1;
