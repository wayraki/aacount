import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';

export interface PostsRo {
  list: Bill[];
  count: number;
}
@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  // 获取指定文章
  async findById(id): Promise<Bill> {
    return await this.billRepository.findOne(id);
  }

  // 更新文章
  async updateById(id, post): Promise<Bill> {
    const existPost = await this.billRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.billRepository.merge(existPost, post);
    return this.billRepository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.billRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.billRepository.remove(existPost);
  }
}
