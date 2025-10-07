import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateUserDto, UpdateUserDto, UserQueryDto } from "./dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllWithCount(queryParams: UserQueryDto) {
    const whereClause = this.buildWhereClause(queryParams);
    const orderBy = this.buildOrderBy(queryParams);
    const pagination = this.buildPagination(queryParams);

    // Parallel execution for better performance
    const [users, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        orderBy,
        ...pagination,
      }),
      this.prisma.user.count({
        where: whereClause,
      }),
    ]);

    return { users, totalCount };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }

    // Check if email is being updated and if it already exists
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException("Email already exists");
      }
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException("User not found");
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException("User not found");
      }
      throw error;
    }
  }


  private buildWhereClause(queryParams: UserQueryDto): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};

    // Role filter
    if (queryParams.role && queryParams.role !== "all") {
      where.role = queryParams.role as "admin" | "user" | "moderator";
    }

    // Status filter
    if (queryParams.status && queryParams.status !== "all") {
      where.status = queryParams.status as "active" | "inactive" | "pending";
    }

    // Email filter (for email uniqueness check)
    if (queryParams.email) {
      where.email = queryParams.email;
    }

    // Exclude ID filter (for email uniqueness check)
    if (queryParams.id_ne) {
      where.id = { not: queryParams.id_ne };
    }

    // Search filter (q parameter)
    if (queryParams.q) {
      where.OR = [
        {
          name: {
            contains: queryParams.q,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: queryParams.q,
            mode: "insensitive",
          },
        },
      ];
    }

    return where;
  }

  private buildOrderBy(queryParams: UserQueryDto): Prisma.UserOrderByWithRelationInput {
    if (!queryParams._sort) {
      return { createdAt: "desc" }; // Default sorting
    }

    const sortField = queryParams._sort;
    const sortOrder = queryParams._order || "asc";

    // Validate that the sort field is a valid Prisma field
    const validFields = ["name", "email", "role", "status", "createdAt", "updatedAt", "lastLogin"];

    if (!validFields.includes(sortField)) {
      return { createdAt: "desc" }; // Fallback to default
    }

    return { [sortField]: sortOrder };
  }

  private buildPagination(queryParams: UserQueryDto) {
    const page = queryParams._page || 1;
    const limit = queryParams._limit || 10;
    const skip = (page - 1) * limit;

    return {
      take: limit,
      skip,
    };
  }
}
