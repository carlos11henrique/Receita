import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AffiliateLink } from '../db/AffiliateLink.entity';
import { User } from '../db/user.entity';
import { Product } from '../db/Product.entity';
import { CreateAffiliateLinkDto } from '../dto/CreateAffiliateLinkDto';
import { UpdateAffiliateLinkDto } from '../dto/UpdateAffiliateLinkDto';

@Injectable()
export class AffiliateLinkService {
  constructor(
    @InjectRepository(AffiliateLink)
    private affiliateLinkRepository: Repository<AffiliateLink>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createAffiliateLinkDto: CreateAffiliateLinkDto): Promise<AffiliateLink> {
    const { affiliateId, productId, ...payload } = createAffiliateLinkDto;
    const affiliate = await this.userRepository.findOne({ where: { id: affiliateId } });
    if (!affiliate) {
      throw new NotFoundException('Affiliate not found');
    }
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const affiliateLink = this.affiliateLinkRepository.create({
      ...payload,
      affiliate,
      product,
    });
    return this.affiliateLinkRepository.save(affiliateLink);
  }

  async findAll(): Promise<AffiliateLink[]> {
    return this.affiliateLinkRepository.find({ relations: ['affiliate', 'product'] });
  }

  async findOne(id: number): Promise<AffiliateLink> {
    const affiliateLink = await this.affiliateLinkRepository.findOne({
      where: { id },
      relations: ['affiliate', 'product'],
    });
    if (!affiliateLink) {
      throw new NotFoundException('Affiliate link not found');
    }
    return affiliateLink;
  }

  async update(id: number, updateAffiliateLinkDto: UpdateAffiliateLinkDto): Promise<AffiliateLink> {
    const affiliateLink = await this.findOne(id);
    Object.assign(affiliateLink, updateAffiliateLinkDto);
    return this.affiliateLinkRepository.save(affiliateLink);
  }

  async remove(id: number): Promise<void> {
    const affiliateLink = await this.findOne(id);
    await this.affiliateLinkRepository.remove(affiliateLink);
  }
}
