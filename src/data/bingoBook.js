export const bingoCategories = [
  'Akatsuki Members',
  'Missing-nin',
  'Criminal Records',
  'Legendary Threats',
]

const createRecord = (
  name,
  category,
  organization,
  village,
  reward
) => ({
  name,
  category,
  organization,
  village,
  reward,
  rewardType: 'Unofficial',
})

export const bingoRecords = [
  createRecord('Itachi Uchiha', 'Akatsuki Members', 'Akatsuki', 'Konohagakure', 50000000),
  createRecord('Kisame Hoshigaki', 'Akatsuki Members', 'Akatsuki', 'Kirigakure', 40000000),
  createRecord('Deidara', 'Akatsuki Members', 'Akatsuki', 'Iwagakure', 30000000),
  createRecord('Sasori', 'Akatsuki Members', 'Akatsuki', 'Sunagakure', 35000000),
  createRecord('Hidan', 'Akatsuki Members', 'Akatsuki', 'Yugakure', 30000000),
  createRecord('Kakuzu', 'Akatsuki Members', 'Akatsuki', 'Takigakure', 45000000),
  createRecord('Nagato', 'Akatsuki Members', 'Akatsuki', 'Amegakure', 80000000),
  createRecord('Konan', 'Akatsuki Members', 'Akatsuki', 'Amegakure', 35000000),
  createRecord('Zetsu', 'Akatsuki Members', 'Akatsuki', 'Unknown', 45000000),
  createRecord('Obito Uchiha', 'Akatsuki Members', 'Akatsuki', 'Konohagakure', 90000000),

  createRecord('Orochimaru', 'Missing-nin', 'Otogakure', 'Konohagakure', 60000000),
  createRecord('Sasuke Uchiha', 'Missing-nin', 'Taka', 'Konohagakure', 55000000),
  createRecord('Zabuza Momochi', 'Missing-nin', 'Independent', 'Kirigakure', 25000000),
  createRecord('Raiga Kurosuki', 'Missing-nin', 'Independent', 'Kirigakure', 20000000),
  createRecord('Mizuki', 'Missing-nin', 'Independent', 'Konohagakure', 5000000),
  createRecord('Suigetsu Hōzuki', 'Missing-nin', 'Taka', 'Kirigakure', 15000000),
  createRecord('Aoi Rokushō', 'Missing-nin', 'Amegakure', 'Konohagakure', 10000000),
  createRecord('Gantetsu', 'Missing-nin', 'Shinobazu', 'Unknown', 8000000),
  createRecord('Monju', 'Missing-nin', 'Shinobazu', 'Unknown', 12000000),
  createRecord('Shura', 'Missing-nin', 'Shinobazu', 'Unknown', 10000000),
  createRecord('Hiruko', 'Missing-nin', 'Independent', 'Konohagakure', 40000000),
  createRecord('Mukade', 'Missing-nin', 'Independent', 'Sunagakure', 20000000),

  createRecord('Kabuto Yakushi', 'Criminal Records', 'Otogakure', 'Unknown', 45000000),
  createRecord('Gatō', 'Criminal Records', 'Gatō Company', 'Unknown', 10000000),
  createRecord('Kidōmaru', 'Criminal Records', 'Sound Four', 'Otogakure', 12000000),
  createRecord('Jirōbō', 'Criminal Records', 'Sound Four', 'Otogakure', 10000000),
  createRecord('Tayuya', 'Criminal Records', 'Sound Four', 'Otogakure', 12000000),
  createRecord('Sakon', 'Criminal Records', 'Sound Four', 'Otogakure', 15000000),
  createRecord('Ukon', 'Criminal Records', 'Sound Four', 'Otogakure', 15000000),
  createRecord('Kimimaro', 'Criminal Records', 'Otogakure', 'Unknown', 25000000),
  createRecord('Dosu Kinuta', 'Criminal Records', 'Otogakure', 'Unknown', 6000000),
  createRecord('Zaku Abumi', 'Criminal Records', 'Otogakure', 'Unknown', 5000000),
  createRecord('Kin Tsuchi', 'Criminal Records', 'Otogakure', 'Unknown', 5000000),
  createRecord('Guren', 'Criminal Records', 'Otogakure', 'Unknown', 18000000),

  createRecord('Madara Uchiha', 'Legendary Threats', 'Independent', 'Konohagakure', 100000000),
  createRecord('Kaguya Ōtsutsuki', 'Legendary Threats', 'Ōtsutsuki Clan', 'Unknown', 200000000),
  createRecord('Kinkaku', 'Legendary Threats', 'Gold and Silver Brothers', 'Kumogakure', 45000000),
  createRecord('Ginkaku', 'Legendary Threats', 'Gold and Silver Brothers', 'Kumogakure', 45000000),
  createRecord('Black Zetsu', 'Legendary Threats', 'Independent', 'Unknown', 80000000),
  createRecord('Danzō Shimura', 'Legendary Threats', 'Root', 'Konohagakure', 40000000),
]