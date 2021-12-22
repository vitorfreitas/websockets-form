import { Test, TestingModule } from '@nestjs/testing';
import { FormGateway } from './form.gateway';

describe('FormGateway', () => {
  let gateway: FormGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormGateway],
    }).compile();

    gateway = module.get<FormGateway>(FormGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
