INPUT_DIR = .
OUTPUT_DIR = output

SASS_OPTIONS = --no-error-css --style compressed \
               --silence-deprecation mixed-decls
CLOSURE_OPTIONS = --jscomp_off "*"

SUB_DIRS = fonts css images js

FONTS_INPUT_FILES = $(wildcard $(INPUT_DIR)/fonts/*.woff2)
FONTS_OUTPUT_FILES = $(FONTS_INPUT_FILES:$(INPUT_DIR)/%=$(OUTPUT_DIR)/%)

CSS_INPUT_FILES = $(wildcard $(INPUT_DIR)/css/*.scss)
CSS_OUTPUT_FILES = $(CSS_INPUT_FILES:$(INPUT_DIR)/%.scss=$(OUTPUT_DIR)/%.css)

IMAGES_INPUT_FILES = $(shell find $(INPUT_DIR)/images -name *.png -or -name *.svg)
IMAGES_OUTPUT_FILES = $(IMAGES_INPUT_FILES:$(INPUT_DIR)/%=$(OUTPUT_DIR)/%)

JS_INPUT_BUNDLES = $(shell find $(INPUT_DIR)/js -mindepth 1 -maxdepth 1 -type d)
JS_INPUT_FILES = $(wildcard $(INPUT_DIR)/js/*.js)
JS_OUTPUT_FILES =						\
	$(JS_INPUT_BUNDLES:$(INPUT_DIR)/%=$(OUTPUT_DIR)/%.js)	\
	$(JS_INPUT_FILES:$(INPUT_DIR)/%.js=$(OUTPUT_DIR)/%.js)

define js_bundle_rule
$(subst $(INPUT_DIR),$(OUTPUT_DIR),$1).js: $(wildcard $1/*.js)
	closure-compiler $(CLOSURE_OPTIONS) \
	    --js $$^ --js_output_file $$@ \
	    --create_source_map %outname%.map && \
	echo "//# sourceMappingURL=$$(notdir $$@).map" >>$$@
endef

all: build

build: prepare_output_dir build-fonts build-css build-images build-js

build-fonts: $(FONTS_OUTPUT_FILES)

$(OUTPUT_DIR)/fonts/%.woff2: $(INPUT_DIR)/fonts/%.woff2
	cp $< $@

build-css: $(CSS_OUTPUT_FILES)

$(OUTPUT_DIR)/css/%.css: $(INPUT_DIR)/css/%.scss FORCE
	sass $(SASS_OPTIONS) $<:$@

build-images: $(IMAGES_OUTPUT_FILES)

$(OUTPUT_DIR)/images/%.png: $(INPUT_DIR)/images/%.png
	mkdir -p $(dir $@)
	cp -L $< $@

$(OUTPUT_DIR)/images/%.svg: $(INPUT_DIR)/images/%.svg
	cp -L $< $@

build-js: $(JS_OUTPUT_FILES)

$(foreach bundle,$(JS_INPUT_BUNDLES),$(eval $(call js_bundle_rule,$(bundle))))

$(OUTPUT_DIR)/js/%.js: $(INPUT_DIR)/js/%.js
	cp -L $< $@

prepare_output_dir:
	@mkdir -p $(addprefix $(OUTPUT_DIR)/,$(SUB_DIRS))

clean:
	$(RM) -r  $(addprefix $(OUTPUT_DIR)/,$(SUB_DIRS))

FORCE:

.PHONY: all build build-fonts build-css build-images build-js
.PHONY: prepare_output_dir clean
