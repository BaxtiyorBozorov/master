import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Jadvalni tozalash
  await knex('categories').del();

  // Ma'lumotlarni qo'shish
  await knex('categories').insert([
    {
      name: 'iPhone ta’miri',
      description: 'Ekran almashtirish, Face ID, zaryad muammolari',
      icon: 'apple-icon.png',
    },
    {
      name: 'Samsung ta’miri',
      description: 'Ekran, sensor ishlamasligi, suv tushishi muammolari',
      icon: 'android-icon.png',
    },
    {
      name: 'Redmi ta’miri',
      description: 'Batareya tez tugashi, tarmoq yo‘qolishi, mikrofon ishlamasligi',
      icon: 'wrench-icon.png',
    },
    {
      name: 'Batareya muammolari',
      description: 'Telefon tez quvvatdan tushyaptimi? Batareyani almashtiramiz!',
      icon: 'battery-icon.png',
    },
    {
      name: 'Kamera ta’miri',
      description: 'Kamera xiralashishi, fokus ishlamasligi, linza almashtirish',
      icon: 'camera-icon.png',
    },
    {
      name: 'Noutbuk ta’miri',
      description: 'Ekran, klaviatura, sovutish tizimi muammolari',
      icon: 'laptop-icon.png',
    },
    {
      name: 'Planshet ta’miri',
      description: 'Ekran almashtirish, sensor muammolari, zaryad muammolari',
      icon: 'tablet-icon.png',
    },
    {
      name: 'Quvvat porti ta’miri',
      description: 'Telefon yoki noutbuk quvvat olmayaptimi? Portni almashtiramiz!',
      icon: 'charging-port-icon.png',
    },
    {
      name: 'Suv tushishi muammolari',
      description: 'Telefon yoki noutbuk suvga tushgan bo‘lsa, quritib va ta’mirlab beramiz',
      icon: 'water-damage-icon.png',
    },
    {
      name: 'Tugmalar ta’miri',
      description: 'Power, ovoz balandligi tugmalari ishlamayaptimi? Almashtiramiz!',
      icon: 'button-repair-icon.png',
    },
  ]);
}
