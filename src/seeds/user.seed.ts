
import { AdminDao } from '../dao/admin.dao';
import { DUser, Role } from './../models/user.model';

export const adminEmail = `admin@guestbook.com`;

export default async function seedUser() {
    const admin: DUser = {
        email: adminEmail,
        password: '111111',
        role: Role.SUPER_ADMIN,
        lastLogin: new Date()
    }

    const _supperEmail =  await createAdmin(admin);
}

async function createAdmin(user: DUser) {
    const existingUser = await AdminDao.getAdminByEmail(user.email);
    if (existingUser) {
        return existingUser;
    }
    return await AdminDao.createAdmin(user);
}