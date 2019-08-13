FROM ubuntu:16.04
RUN apt-get update && apt-get install -y \
    apt-transport-https ca-certificates curl wget gnupg --no-install-recommends \
    # adding key, repository, and installing chrome stable
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install -y \
    google-chrome-stable \
    --no-install-recommends \
    # adding repository and installing nodejs 11.x
    && curl -sL https://deb.nodesource.com/setup_11.x | bash - \
    && apt install nodejs -y

WORKDIR /present

COPY ./ /present
RUN npm i

CMD google-chrome --headless --disable-gpu --remote-debugging-port=9222 --cap-add=SYS_ADMIN --no-sandbox