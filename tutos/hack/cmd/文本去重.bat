@echo off
(for /f "delims=" %%a in ('type "123.txt"') do if not defined %%a (echo,%%a &set %%a=def))>"���.txt"
pause