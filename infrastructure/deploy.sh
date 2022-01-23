#!/bin/bash

rsync -avz *.yaml cluster@cluster:/home/cluster/app
rsync -avz *.yml cluster@cluster:/home/cluster/app
