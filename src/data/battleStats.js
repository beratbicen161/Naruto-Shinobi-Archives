
export const powerTiers = [
  { name: 'God Tier', min: 950, color: '#EAB308' },
  { name: 'Legendary', min: 850, color: '#A855F7' },
  { name: 'Kage Level', min: 700, color: '#EF4444' },
  { name: 'Elite Jonin', min: 550, color: '#F97316' },
  { name: 'Jonin', min: 400, color: '#3B82F6' },
  { name: 'Chunin', min: 250, color: '#22C55E' },
  { name: 'Genin', min: 100, color: '#94A3B8' },
  { name: 'Academy', min: 0, color: '#78716C' },
]

function createForm(id, name, power, element, jutsu) {
  return {
    id,
    name,
    power,
    element,
    jutsu,
    source: 'Custom Arena Rating',
  }
}

export const battleStats = [
  {
    name: 'Naruto Uzumaki',
    forms: [
      createForm('part1', 'Part I', 220, 'wind', 'Shadow Clone Jutsu'),
      createForm('base', 'Base Shippuden', 450, 'wind', 'Rasengan'),
      createForm('sage', 'Sage Mode', 650, 'wind', 'Rasenshuriken'),
      createForm('kcm1', 'Kurama Chakra Mode 1', 780, 'chakra', 'Planetary Rasengan'),
      createForm('kcm2', 'Kurama Chakra Mode 2', 850, 'chakra', 'Tailed Beast Bomb'),
      createForm('sixpaths', 'Six Paths Sage Mode', 980, 'chakra', 'Six Paths Rasenshuriken'),
    ],
  },
  {
    name: 'Sasuke Uchiha',
    forms: [
      createForm('part1', 'Part I', 230, 'lightning', 'Chidori'),
      createForm('base', 'Base Shippuden', 520, 'lightning', 'Chidori Stream'),
      createForm('curse', 'Curse Mark Stage 2', 610, 'lightning', 'Dark Chidori'),
      createForm('ms', 'Mangekyo Sharingan', 740, 'fire', 'Amaterasu'),
      createForm('ems', 'Eternal Mangekyo Sharingan', 850, 'fire', 'Susanoo'),
      createForm('rinnegan', 'Rinnegan', 980, 'lightning', 'Indra Arrow'),
    ],
  },
  {
    name: 'Sakura Haruno',
    forms: [
      createForm('part1', 'Part I', 120, 'chakra', 'Chakra Control'),
      createForm('shippuden', 'Shippuden', 480, 'chakra', 'Chakra Enhanced Strength'),
      createForm('byakugou', 'Strength of a Hundred Seal', 790, 'chakra', 'Strength of a Hundred'),
    ],
  },
  {
    name: 'Kakashi Hatake',
    forms: [
      createForm('part1', 'Part I', 560, 'lightning', 'Lightning Blade'),
      createForm('shippuden', 'Shippuden', 680, 'lightning', 'Kamui'),
      createForm('war', 'War Arc', 800, 'lightning', 'Lightning Transmission'),
      createForm('dms', 'Double Mangekyo Sharingan', 970, 'lightning', 'Kamui Shuriken'),
    ],
  },
  {
    name: 'Madara Uchiha',
    forms: [
      createForm('ems', 'Eternal Mangekyo Sharingan', 880, 'fire', 'Perfect Susanoo'),
      createForm('edo', 'Edo Tensei', 920, 'fire', 'Heaven Concealed'),
      createForm('rinnegan', 'Rinnegan', 940, 'chakra', 'Limbo'),
      createForm('juubi', 'Ten-Tails Jinchuriki', 995, 'chakra', 'Infinite Tsukuyomi'),
    ],
  },
  {
    name: 'Obito Uchiha',
    forms: [
      createForm('young', 'Young Obito', 180, 'fire', 'Fireball Jutsu'),
      createForm('orange', 'Orange Mask', 820, 'fire', 'Kamui'),
      createForm('white', 'White Mask', 910, 'chakra', 'Kamui'),
      createForm('juubi', 'Ten-Tails Jinchuriki', 960, 'chakra', 'Truth-Seeking Orbs'),
    ],
  },
  {
    name: 'Hashirama Senju',
    forms: [
      createForm('base', 'Base Form', 880, 'wood', 'Wood Dragon Jutsu'),
      createForm('sage', 'Sage Mode', 930, 'wood', 'True Several Thousand Hands'),
    ],
  },
  {
    name: 'Tobirama Senju',
    forms: [
      createForm('base', 'Second Hokage', 850, 'water', 'Water Dragon Jutsu'),
    ],
  },
  {
    name: 'Hiruzen Sarutobi',
    forms: [
      createForm('old', 'Third Hokage', 750, 'fire', 'Fire Dragon Flame Bullet'),
      createForm('edo', 'Edo Tensei', 790, 'fire', 'Five Release Great Combo'),
    ],
  },
  {
    name: 'Minato Namikaze',
    forms: [
      createForm('base', 'Fourth Hokage', 860, 'chakra', 'Flying Raijin'),
      createForm('kcm', 'Kurama Chakra Mode', 920, 'chakra', 'Tailed Beast Bomb'),
    ],
  },
  {
    name: 'Tsunade',
    forms: [
      createForm('base', 'Fifth Hokage', 740, 'chakra', 'Chakra Enhanced Strength'),
      createForm('byakugou', 'Strength of a Hundred Seal', 820, 'chakra', 'Creation Rebirth'),
    ],
  },
  {
    name: 'Jiraiya',
    forms: [
      createForm('base', 'Legendary Sannin', 740, 'fire', 'Rasengan'),
      createForm('sage', 'Sage Mode', 830, 'chakra', 'Sage Art Rasengan'),
    ],
  },
  {
    name: 'Orochimaru',
    forms: [
      createForm('base', 'Legendary Sannin', 760, 'chakra', 'Hidden Shadow Snake Hands'),
      createForm('hydra', 'Eight Branches Technique', 830, 'chakra', 'Eight Branches Technique'),
    ],
  },
  {
    name: 'Itachi Uchiha',
    forms: [
      createForm('akatsuki', 'Akatsuki', 840, 'fire', 'Amaterasu'),
      createForm('susanoo', 'Susanoo', 880, 'fire', 'Totsuka Blade'),
      createForm('edo', 'Edo Tensei', 890, 'fire', 'Izanami'),
    ],
  },
  {
    name: 'Nagato',
    aliases: ['Pain'],
    forms: [
      createForm('pain', 'Six Paths of Pain', 890, 'chakra', 'Almighty Push'),
      createForm('edo', 'Edo Tensei', 910, 'chakra', 'Planetary Devastation'),
    ],
  },
  {
    name: 'Konan',
    forms: [
      createForm('base', 'Akatsuki', 710, 'paper', 'Dance of the Shikigami'),
    ],
  },
  {
    name: 'Kisame Hoshigaki',
    forms: [
      createForm('base', 'Akatsuki', 760, 'water', 'Water Shark Bomb'),
      createForm('fusion', 'Samehada Fusion', 820, 'water', 'Water Prison Shark Dance'),
    ],
  },
  {
    name: 'Deidara',
    forms: [
      createForm('base', 'Akatsuki', 740, 'earth', 'Explosive Clay'),
    ],
  },
  {
    name: 'Sasori',
    forms: [
      createForm('base', 'Akatsuki', 730, 'earth', 'Red Secret Technique'),
    ],
  },
  {
    name: 'Kakuzu',
    forms: [
      createForm('base', 'Akatsuki', 740, 'chakra', 'Earth Grudge Fear'),
    ],
  },
  {
    name: 'Hidan',
    forms: [
      createForm('base', 'Akatsuki', 620, 'chakra', 'Curse Technique'),
    ],
  },
  {
    name: 'Zetsu',
    aliases: ['Black Zetsu', 'White Zetsu'],
    forms: [
      createForm('base', 'Akatsuki', 480, 'wood', 'Mayfly'),
    ],
  },
  {
    name: 'Gaara',
    forms: [
      createForm('part1', 'Part I', 420, 'sand', 'Sand Coffin'),
      createForm('kazekage', 'Fifth Kazekage', 740, 'sand', 'Sand Tsunami'),
      createForm('war', 'War Arc', 820, 'sand', 'Grand Sand Mausoleum'),
    ],
  },
  {
    name: 'Rock Lee',
    forms: [
      createForm('part1', 'Part I', 280, 'taijutsu', 'Primary Lotus'),
      createForm('shippuden', 'Shippuden', 510, 'taijutsu', 'Leaf Hurricane'),
      createForm('gates', 'Six Gates', 740, 'taijutsu', 'Morning Peacock'),
    ],
  },
  {
    name: 'Might Guy',
    aliases: ['Maito Gai'],
    forms: [
      createForm('base', 'Base Form', 650, 'taijutsu', 'Leaf Hurricane'),
      createForm('sixth', 'Sixth Gate', 800, 'taijutsu', 'Morning Peacock'),
      createForm('seventh', 'Seventh Gate', 890, 'taijutsu', 'Daytime Tiger'),
      createForm('eighth', 'Eighth Gate', 985, 'taijutsu', 'Night Guy'),
    ],
  },
  {
    name: 'Neji Hyuga',
    forms: [
      createForm('part1', 'Part I', 290, 'chakra', 'Eight Trigrams Sixty-Four Palms'),
      createForm('shippuden', 'Shippuden', 560, 'chakra', 'Eight Trigrams Rotation'),
    ],
  },
  {
    name: 'Hinata Hyuga',
    forms: [
      createForm('part1', 'Part I', 160, 'chakra', 'Gentle Fist'),
      createForm('shippuden', 'Shippuden', 480, 'chakra', 'Twin Lion Fists'),
    ],
  },
  {
    name: 'Shikamaru Nara',
    forms: [
      createForm('part1', 'Part I', 230, 'shadow', 'Shadow Possession'),
      createForm('shippuden', 'Shippuden', 520, 'shadow', 'Shadow Sewing'),
    ],
  },
  {
    name: 'Ino Yamanaka',
    forms: [
      createForm('part1', 'Part I', 150, 'chakra', 'Mind Transfer Jutsu'),
      createForm('shippuden', 'Shippuden', 430, 'chakra', 'Mind Transmission'),
    ],
  },
  {
    name: 'Choji Akimichi',
    forms: [
      createForm('base', 'Shippuden', 460, 'chakra', 'Expansion Jutsu'),
      createForm('butterfly', 'Butterfly Mode', 670, 'chakra', 'Butterfly Bullet Bomb'),
    ],
  },
  {
    name: 'Kiba Inuzuka',
    forms: [
      createForm('base', 'Shippuden', 440, 'wind', 'Fang Over Fang'),
    ],
  },
  {
    name: 'Shino Aburame',
    forms: [
      createForm('base', 'Shippuden', 470, 'chakra', 'Insect Sphere'),
    ],
  },
  {
    name: 'Tenten',
    forms: [
      createForm('base', 'Shippuden', 420, 'chakra', 'Twin Rising Dragons'),
    ],
  },
  {
    name: 'Sai',
    forms: [
      createForm('base', 'Shippuden', 510, 'ink', 'Super Beast Scroll'),
    ],
  },
  {
    name: 'Yamato',
    aliases: ['Tenzo'],
    forms: [
      createForm('base', 'Shippuden', 650, 'wood', 'Wood Locking Wall'),
    ],
  },
  {
    name: 'Asuma Sarutobi',
    forms: [
      createForm('base', 'Jonin', 590, 'wind', 'Flying Swallow'),
    ],
  },
  {
    name: 'Kurenai Yuhi',
    forms: [
      createForm('base', 'Jonin', 520, 'chakra', 'Tree Binding Death'),
    ],
  },
  {
    name: 'Killer B',
    aliases: ['Killer Bee'],
    forms: [
      createForm('base', 'Base Form', 750, 'lightning', 'Lightning Release'),
      createForm('version2', 'Version 2', 850, 'chakra', 'Lariat'),
      createForm('gyuki', 'Eight-Tails Form', 900, 'chakra', 'Tailed Beast Bomb'),
    ],
  },
  {
    name: 'Kaguya Otsutsuki',
    forms: [
      createForm('base', 'Rabbit Goddess', 1000, 'chakra', 'Amenominaka'),
    ],
  },
  {
    name: 'Hagoromo Otsutsuki',
    forms: [
      createForm('base', 'Sage of Six Paths', 995, 'chakra', 'Creation of All Things'),
    ],
  },
  {
    name: 'Hamura Otsutsuki',
    forms: [
      createForm('base', 'Otsutsuki', 975, 'chakra', 'Six Paths Chakra'),
    ],
  },
  {
    name: 'Indra Otsutsuki',
    forms: [
      createForm('base', 'Mangekyo Sharingan', 930, 'lightning', 'Susanoo'),
    ],
  },
  {
    name: 'Asura Otsutsuki',
    forms: [
      createForm('base', 'Six Paths Chakra', 930, 'chakra', 'Six Paths Chakra Avatar'),
    ],
  },
  {
    name: 'Kabuto Yakushi',
    forms: [
      createForm('base', 'Medical Ninja', 560, 'chakra', 'Chakra Scalpel'),
      createForm('sage', 'Sage Mode', 890, 'chakra', 'White Rage Technique'),
    ],
  },
  {
    name: 'Zabuza Momochi',
    forms: [
      createForm('base', 'Demon of the Hidden Mist', 580, 'water', 'Hidden Mist Jutsu'),
    ],
  },
  {
    name: 'Haku',
    forms: [
      createForm('base', 'Ice Release', 440, 'ice', 'Demonic Mirroring Ice Crystals'),
    ],
  },
  {
    name: 'Mei Terumi',
    forms: [
      createForm('base', 'Fifth Mizukage', 760, 'lava', 'Lava Release'),
    ],
  },
  {
    name: 'Onoki',
    aliases: ['Oonoki'],
    forms: [
      createForm('base', 'Third Tsuchikage', 850, 'dust', 'Particle Style'),
    ],
  },
  {
    name: 'Danzo Shimura',
    forms: [
      createForm('base', 'Root Leader', 760, 'wind', 'Izanagi'),
    ],
  },
  {
    name: 'Kimimaro',
    forms: [
      createForm('base', 'Base Form', 510, 'chakra', 'Dance of the Camellia'),
      createForm('curse', 'Curse Mark Stage 2', 650, 'chakra', 'Dance of the Seedling Fern'),
    ],
  },
]

export function normalizeBattleName(name = '') {
  return String(name ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

export function getBattleCharacter(name) {
  const normalizedName = normalizeBattleName(name)

  if (!normalizedName) {
    return null
  }

  return battleStats.find(character => {
    const names = [
      character.name,
      ...(character.aliases || []),
    ]

    return names.some(
      item => normalizeBattleName(item) === normalizedName
    )
  }) || null
}

export function getCharacterForms(name) {
  return getBattleCharacter(name)?.forms || []
}

export function getCharacterForm(name, formId) {
  return getCharacterForms(name).find(
    form => form.id === formId
  ) || null
}

export function getStrongestForm(name) {
  const forms = getCharacterForms(name)

  if (forms.length === 0) {
    return null
  }

  return forms.reduce((strongest, current) =>
    current.power > strongest.power
      ? current
      : strongest
  )
}

export function getPowerTier(power) {
  if (
    typeof power !== 'number' ||
    !Number.isFinite(power) ||
    power < 0 ||
    power > 1000
  ) {
    return null
  }

  return powerTiers.find(
    tier => power >= tier.min
  ) || null
}

export function hasBattleData(name) {
  return getBattleCharacter(name) !== null
}

export function compareBattlePower(firstForm, secondForm) {
  if (
    !firstForm ||
    !secondForm ||
    !getPowerTier(firstForm.power) ||
    !getPowerTier(secondForm.power)
  ) {
    return null
  }

  const difference = Math.abs(
    firstForm.power - secondForm.power
  )

  if (firstForm.power === secondForm.power) {
    return {
      winner: 'draw',
      difference: 0,
    }
  }

  return {
    winner:
      firstForm.power > secondForm.power
        ? 'first'
        : 'second',
    difference,
  }
}

export const battleStatistics = {
  totalCharacters: battleStats.length,

  totalForms: battleStats.reduce(
    (total, character) => total + character.forms.length,
    0
  ),

  maximumPower: 1000,
}
