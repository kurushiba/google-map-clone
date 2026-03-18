export class Spot {
  id!: string;
  name!: string;
  category!: string;
  latitude!: number;
  longitude!: number;
  address?: string;
  isFavorite!: boolean;

  constructor(data: Spot) {
    Object.assign(this, data);
  }
}

export const CATEGORY_LABELS: { [key: string]: string } = {
  cafe: 'カフェ',
  restaurant: 'レストラン',
  park: '公園',
  shopping: 'ショッピング',
  tourism: '観光',
  convenience: 'コンビニ',
  hospital: '病院',
  station: '駅',
};
