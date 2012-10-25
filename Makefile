
all: pygments site
	@echo "All set!"

pygments:
	@# Styles:
	@# ['monokai', 'manni', 'rrt', 'perldoc', 'borland', 'colorful', 'default', 'murphy', 'vs', 'trac', 'tango', 'fruity', 'autumn', 'bw', 'emacs', 'vim', 'pastie', 'friendly', 'native']
	@mkdir -p css/pygments
	pygmentize -S friendly -f html > css/pygments/default.css

site:
	jekyll --pygments --no-lsi --safe

