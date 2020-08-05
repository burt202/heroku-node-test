#!/bin/bash

BRANCH_NAME=deploy-$(echo `date +%s`)

git ch -b $BRANCH_NAME
git push --set-upstream origin $BRANCH_NAME
git ch -
