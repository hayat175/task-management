//first install npm i @types/passport-jwt and then define strategy here ...
//then add in providers of app.module
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtPayLoad } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //This Tells passport how to extract the tokens
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  //what we wanna do after know the token is valid . At this point we already know the token is valid
  async validate(payload: JwtPayLoad): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
