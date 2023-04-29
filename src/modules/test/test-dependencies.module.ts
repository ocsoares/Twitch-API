import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    imports: [
        /* MODULES */
    ],
    providers: [
        {
            provide: null /* REPO */,
            useClass: null /* FAKE REPO */,
        },
    ],
    exports: [
        /* EXPORT PROVIDE REPO */
    ],
})
export class TestDependenciesModule {}
