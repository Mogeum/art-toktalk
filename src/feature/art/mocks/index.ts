import {Art} from "@/src/feature/art/models";

export const MOCK_ARTWORKS: Art[] = [
  {
    id: 1,
    title: '수련',
    artist: '클로드 모네',
    year: 1906,
    medium: '유화',
    dimensions: '89.9 × 94.1 cm',
    location: '시카고 미술관',
    tags: [{id: 1, name: '인상주의'}, {id: 2, name: '자연'}, {id: 3, name: '빛'}],
    description:
      '모네는 말년에 자신의 정원 지베르니에서 수련 연작을 그렸습니다. 빛의 변화에 따라 달라지는 수면의 색채를 포착하기 위해 하루에도 여러 번 같은 장면을 반복해서 그렸으며, 이 작품은 인상주의의 정수를 보여줍니다.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
    hotspots: [
      {
        id: 1,
        artId: 1,
        x: 0.3,
        y: 0.4,
        title: '빛의 표현',
        summary:
          '모네는 수면에 반사되는 빛을 표현하기 위해 짧고 빠른 붓터치를 사용했습니다. 같은 장소를 다른 시간대에 반복해서 그리며 빛의 순간적인 변화를 캔버스에 담았습니다.',
        imageUrl: '',
      },
      {
        id: 2,
        artId: 1,
        x: 0.65,
        y: 0.25,
        title: '색채의 혼합',
        summary:
          '팔레트에서 색을 섞는 대신 캔버스 위에서 직접 색을 병치시켜 관람자의 눈에서 색이 혼합되도록 했습니다. 이것이 인상주의의 핵심 기법입니다.',
        imageUrl: '',
      },
    ],
  },
  {
    id: 2,
    title: '별이 빛나는 밤',
    artist: '빈센트 반 고흐',
    year: 1889,
    medium: '유화',
    dimensions: '73.7 × 92.1 cm',
    location: '뉴욕 현대미술관 (MoMA)',
    tags: [{id: 4, name: '후기인상주의'}, {id: 5, name: '밤'}, {id: 6, name: '감정'}],
    description:
      '생레미 요양원에 입원 중이던 반 고흐가 창문 너머로 본 밤하늘을 그린 작품입니다. 소용돌이치는 하늘과 빛나는 별들은 그의 내면의 격동을 반영합니다.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    hotspots: [],
  },
  {
    id: 3,
    title: '진주 귀걸이를 한 소녀',
    artist: '요하네스 페르메이르',
    year: 1665,
    medium: '유화',
    dimensions: '44.5 × 39 cm',
    location: '마우리츠하위스 미술관, 헤이그',
    tags: [{id: 7, name: '바로크'}, {id: 8, name: '초상화'}],
    description:
      '"북유럽의 모나리자"라 불리는 이 작품은 신원 미상의 소녀를 그린 트로니(tronie) 형식의 그림입니다. 소녀의 시선과 살짝 벌린 입술이 보는 이를 사로잡습니다.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
    hotspots: [],
  },
  {
    id: 4,
    title: '절규',
    artist: '에드바르 뭉크',
    year: 1893,
    medium: '유화, 템페라, 파스텔',
    dimensions: '91 × 73.5 cm',
    location: '국립미술관, 오슬로',
    tags: [{id: 9, name: '표현주의'}, {id: 6, name: '감정'}],
    description:
      '뭉크가 산책 중 느낀 극도의 불안감을 표현한 작품입니다. 핏빛으로 물든 하늘 아래 절규하는 인물은 현대인의 실존적 공포를 상징하는 아이콘이 되었습니다.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
    hotspots: [],
  },
];