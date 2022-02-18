import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { PublicationEntity } from '@app/publications/publication.entity';
import { MembersEntity } from '@app/members/members.entity';
import { PublicationResponseInterface } from '@app/publications/types/PublicationResponse.interface';
import { CreatePublicationDto } from '@app/publications/dto/CreatePublication.dto';
import slugify from 'slugify';
import { PublicationsResponseInterface } from '@app/publications/types/PublicationsResponse.interface';
import { UpdatePublicationDto } from '@app/publications/dto/UpdatePublication.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(PublicationEntity)
    private readonly publicationRepository: Repository<PublicationEntity>,
    @InjectRepository(MembersEntity)
    private readonly membersRepository: Repository<MembersEntity>,
  ) {}

  async findAll(query: any): Promise<PublicationsResponseInterface> {
    const queryBuilder = getRepository(PublicationEntity).createQueryBuilder(
      'members',
    );

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const publications = await queryBuilder.getMany();
    return { publications };
  }

  async createPublication(
    publicationDto: CreatePublicationDto,
  ): Promise<PublicationEntity> {
    const id = publicationDto.authorId;

    const publication = new PublicationEntity();
    Object.assign(publication, publicationDto);
    publication.slug = this.getSlug(publicationDto.title);
    await this.publicationRepository.save(publication);

    const addedPublication = await this.publicationRepository.findOne({
      title: publicationDto.title,
    });
    const author = await this.membersRepository.findOne(id, {
      relations: ['publications'],
    });

    if (!author) {
      throw new HttpException('Такого сотрудника нет', HttpStatus.NOT_FOUND);
    }

    author.publications.push(addedPublication);
    await this.membersRepository.save(author);

    return await this.publicationRepository.save(publication);
  }

  async findBySlug(slug: string): Promise<PublicationEntity> {
    const { id } = await this.publicationRepository.findOne({ slug });

    if (!id) {
      throw new HttpException(
        'Публикация с таким ID не найдена',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.publicationRepository.findOne(id);
  }

  async buildPublicationsResponse(
    publications: PublicationEntity,
  ): Promise<PublicationResponseInterface> {
    return { publications };
  }

  async deleteBySlug(slug: string): Promise<DeleteResult> {
    const publications = await this.findBySlug(slug);

    if (!publications) {
      throw new HttpException(
        'Работник кафедры не найден',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.publicationRepository.delete({ slug });
  }

  async updatePublication(
    publicationDto: UpdatePublicationDto,
    slug: string,
  ): Promise<PublicationEntity> {
    const publication = await this.findBySlug(slug);

    if (!publication) {
      throw new HttpException('Такой публикации нет', HttpStatus.NOT_FOUND);
    }

    Object.assign(publication, publicationDto);

    return this.publicationRepository.save(publication);
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString() // Приписываем рандрмные символы
    );
  }
}
