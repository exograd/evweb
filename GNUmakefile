INPUT_DIR = .
OUTPUT_DIR = output

SASS_OPTIONS = --no-error-css --style compressed

FONTS_INPUT_FILES = $(wildcard $(INPUT_DIR)/fonts/*.woff2)
FONTS_OUTPUT_FILES = $(FONTS_INPUT_FILES:$(INPUT_DIR)/%=$(OUTPUT_DIR)/%)

CSS_INPUT_FILES = $(wildcard $(INPUT_DIR)/css/*.scss)
CSS_OUTPUT_FILES = $(CSS_INPUT_FILES:$(INPUT_DIR)/%.scss=$(OUTPUT_DIR)/%.css)

all: build

build: prepare_output_dir build-fonts build-css

build-fonts: $(FONTS_OUTPUT_FILES)

$(OUTPUT_DIR)/fonts/%.woff2: $(INPUT_DIR)/fonts/%.woff2
	cp $< $@

build-css: $(CSS_OUTPUT_FILES)

$(OUTPUT_DIR)/css/%.css: $(INPUT_DIR)/css/%.scss
	sass $(SASS_OPTIONS) $<:$@

prepare_output_dir:
	@mkdir -p $(OUTPUT_DIR)/fonts
	@mkdir -p $(OUTPUT_DIR)/css

clean:
	$(RM) -r $(OUTPUT_DIR)/*

.PHONY: all build build-fonts build-css prepare_output_dir clean
