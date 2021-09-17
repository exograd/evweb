INPUT_DIR = .
OUTPUT_DIR = output

SASS_OPTIONS = --no-error-css --style compressed

SUB_DIRS = fonts css images

FONTS_INPUT_FILES = $(wildcard $(INPUT_DIR)/fonts/*.woff2)
FONTS_OUTPUT_FILES = $(FONTS_INPUT_FILES:$(INPUT_DIR)/%=$(OUTPUT_DIR)/%)

CSS_INPUT_FILES = $(wildcard $(INPUT_DIR)/css/*.scss)
CSS_OUTPUT_FILES = $(CSS_INPUT_FILES:$(INPUT_DIR)/%.scss=$(OUTPUT_DIR)/%.css)

IMAGES_INPUT_FILES = $(shell find $(INPUT_DIR) -name *.png)
IMAGES_OUTPUT_FILES = $(IMAGES_INPUT_FILES:$(INPUT_DIR)/%.png=$(OUTPUT_DIR)/%.png)

all: build

build: prepare_output_dir build-fonts build-css build-images

build-fonts: $(FONTS_OUTPUT_FILES)

$(OUTPUT_DIR)/fonts/%.woff2: $(INPUT_DIR)/fonts/%.woff2
	cp $< $@

build-css: $(CSS_OUTPUT_FILES)

$(OUTPUT_DIR)/css/%.css: $(INPUT_DIR)/css/%.scss FORCE
	sass $(SASS_OPTIONS) $<:$@

build-images: $(IMAGES_OUTPUT_FILES)

$(OUTPUT_DIR)/images/%.png: $(INPUT_DIR)/images/%.png
	pngcrush $< $@

prepare_output_dir:
	@mkdir -p $(addprefix $(OUTPUT_DIR)/,$(SUB_DIRS))

clean:
	$(RM) -r  $(addprefix $(OUTPUT_DIR)/,$(SUB_DIRS))

debug:
	@echo "IN:  $(IMAGES_INPUT_FILES)"
	@echo "OUT: $(IMAGES_OUTPUT_FILES)"

FORCE:

.PHONY: all build build-fonts build-css prepare_output_dir clean debug
