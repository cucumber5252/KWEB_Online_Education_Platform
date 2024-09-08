import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  // 데이터 파일 로드 및 초기화
  const dataSource = app.get(DataSource);
  const dataPath = path.join(__dirname, '..', 'data', 'initial_data.json');
  const initialData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // 비밀번호 암호화
  for (const user of initialData.users) {
    user.password = await bcrypt.hash(user.password, 10); // 비밀번호를 bcrypt로 암호화
  }

  // 데이터베이스에 데이터를 삽입
  const userRepository = dataSource.getRepository('User');
  await userRepository.save(initialData.users);

  const courseRepository = dataSource.getRepository('Course');
  await courseRepository.save(initialData.courses);

  const postRepository = dataSource.getRepository('Post');
  await postRepository.save(initialData.posts);

  console.log('데이터베이스가 초기화되었습니다.');
}
bootstrap();
