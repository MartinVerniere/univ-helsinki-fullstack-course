If a group of 6 individuals were developing an application using Python, the specific tools that would be used for each of the steps in CI (linting, testing, and building) would be:
- Linting: Use pylint for linting, a static code analysis tool which looks for programming errors, helps enforcing a coding standard, sniffs for code smells and offers simple refactoring suggestions.
- Testing: Use pyTest for testing, a framework that makes it easy to write small, readable tests, and can scale to support complex functional testing for applications and libraries.
- Building: Use setuptools, the standard Python build system used to define the package structure and dependencies via setup.py or pyproject.toml.

The alternatives for Continuous Integration other than using Jenkins and GithubActions that could be mentioned, would be GitLab CI/CD, or Azure Pipelines, that both allow implementiong CI/CD in an application development.

This setup would be better in a cloud based environmnet, because as it is a small developer team, perhaps they should be more focused on the code development than in setting up all necesary configuration, so utilizing a cloud based environment would be more useful as they wouldnt need to waste time setting up their own project CI/CD. Furthermore, this would be a cheaper alternative than developing the tools in-house.