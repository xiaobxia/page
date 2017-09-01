#!/bin/sh
tar zcf home.tar.gz -C ./dist .
scp home.tar.gz root@39.108.114.91:/opt/website/
