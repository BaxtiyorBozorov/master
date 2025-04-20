import { generateHashedPassword } from 'src/common/utils/bycrypt.functions';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Users jadvaliga ma'lumot qo'shish
    const users = [
        {
            firstname: 'Ali',
            email: 'ali@example.com',
            lastname: 'Aliyev',
            phone: '+998901234567',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Vali',
            email: 'vali@example.com',
            lastname: 'Valiyev',
            phone: '+998901234568',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Olim',
            email: 'olim@example.com',
            lastname: 'Olimov',
            phone: '+998901234569',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Zafar',
            email: 'zafar@example.com',
            lastname: 'Zafarov',
            phone: '+998901234570',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Bobur',
            email: 'bobur@example.com',
            lastname: 'Boburov',
            phone: '+998901234571',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Jasur',
            email: 'jasur@example.com',
            lastname: 'Jasurov',
            phone: '+998901234572',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Doston',
            email: 'doston@example.com',
            lastname: 'Dostonov',
            phone: '+998901234573',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Shodmon',
            email: 'shodmon@example.com',
            lastname: 'Shodmonov',
            phone: '+998901234574',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Sardor',
            email: 'sardor@example.com',
            lastname: 'Sardorov',
            phone: '+998901234575',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
        {
            firstname: 'Farhod',
            email: 'farhod@example.com',
            lastname: 'Farhodov',
            phone: '+998901234576',
            password: await generateHashedPassword('StrongPassword'),
            role: 'master',
        },
    ];

    // Users jadvaliga insert qilish va ID larni olish
    const insertedUsers = await knex('users')
        .insert(users)
        .returning(['id', 'firstname']); // ID va boshqa kerakli maydonlarni qaytaradi

    // Masters jadvaliga ma'lumot qo'shish
    const masters = insertedUsers.map((user) => ({
        user_id: user.id, // users jadvalidan olingan ID
        // specialty: `Master ${user.firstname}`, // 'name' o'rniga 'firstname' ishlatilmoqda
        category_id: [1, 2, 3], // Buni o'zingizga mos ravishda o'zgartiring
        min_price: 50000,
        max_price: 300000,
        address: 'Tashkent, Uzbekistan',
        experience: 5,
        rating_avg: 4.5,
        is_premium: false,
        latitude: 41.2995,
        longitude: 69.2401,
    }));

    await knex('masters').insert(masters);
    console.log('Masters inserted successfully');
    console.log(`Inserted ${masters.length} masters`);
};
