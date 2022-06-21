import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsersAndRoles implements Seeder {
  public async run(factory: Factory, datasource: DataSource): Promise<any> {
    const roleRepository = datasource.getRepository('roles');

    const role = await roleRepository.find({
      where: [
        { name: 'DEVELOPER', description: 'Desenvolvedor' },
        { name: 'ADMIN', description: 'Administrador' },
        { name: 'USER', description: 'Usuário comum' },
      ],
    });

    let userRole;

    if (!role || role.length === 0) {
      const inserted = await roleRepository.insert([
        { name: 'DEVELOPER', description: 'Desenvolvedor' },
        { name: 'ADMIN', description: 'Administrador' },
        { name: 'USER', description: 'Usuário comum' },
      ]);

      userRole = inserted.raw[0];
    }

    if (!userRole) userRole = role[0];

    const userRepository = datasource.getRepository('users');

    const created = userRepository.create({
      email: 'amonteirojr@gmail.com',
      firstname: 'Adriano',
      lastname: 'Monteiro',
      role: userRole,
      password: '$2a$12$hhP5fZYPsW1scUca5eBTTeEWjAhc5YTaevxNe88KFElwpfWGxEqb6',
    });

    await userRepository.save(created);
  }
}
