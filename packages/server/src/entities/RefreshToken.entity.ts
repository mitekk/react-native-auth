import { BeforeCreate, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType } from "type-graphql";
import { v4 } from "uuid";
import JwtUtil, { ExpiresIn } from "../utils/jwt.util";

@ObjectType()
@Entity()
export class RefreshToken {
  @PrimaryKey()
  id: string;

  @Property()
  token: string;

  @Property()
  createdAt: Date = new Date();

  @BeforeCreate()
  async createTokenBeforeInsert() {
    const id = v4();
    this.token = JwtUtil.sign(id, ExpiresIn.RefreshToken);
    this.id = id;
  }
}
