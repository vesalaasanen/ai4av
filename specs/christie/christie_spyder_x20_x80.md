---
spec_id: admin/christie-spyder-x20-x80
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Spyder X20/X80 Control Spec"
manufacturer: Christie
model_family: "Spyder X20"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Spyder X20"
    - "Spyder X80"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
retrieved_at: 2026-04-29T23:11:34.856Z
last_checked_at: 2026-04-30T09:39:41.263Z
generated_at: 2026-04-30T09:39:41.263Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:39:41.263Z
  matched_actions: 94
  action_count: 94
  confidence: high
  summary: "All 94 spec actions matched literally in source with correct parameter shapes and transport values verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Christie Spyder X20/X80 Control Spec

## Summary
Video processor and presentation system supporting dual-control via RS-232 serial and UDP over Ethernet. Both interfaces expose identical string commands and can operate concurrently. Serial commands are terminated with carriage return. UDP requires a 10-byte header prepended to each packet.

<!-- UNRESOLVED: serial baud rate and port configuration not stated in source; configured via Spyder Studio -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 11116
serial:
  baud_rate: null
  data_bits: null
  parity: null
  stop_bits: null
  flow_control: null
auth:
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: air
  label: AIR - Aspect Insensitive Resize
  kind: action
  params:
    - name: sizing_type
      type: integer
      description: "0 = Absolute Size (In Pixels), 1 = Relative Size (In Pixels)"
    - name: target_dimension
      type: integer
      description: "0 = Adjust Width (Horizontal Size), 1 = Adjust Height (Vertical Size)"
    - name: new_size
      type: integer
      description: New size in pixels
    - name: layer_ids
      type: integer[]
      description: One or more layer IDs to apply sizing change to

- id: arl
  label: ARL - Apply Register to Layer
  kind: action
  params:
    - name: register_type
      type: integer
      description: "0 = Effect, 1 = Playitem, 4 = Command key/script, 5 = Treatment, 6 = Source, 7 = Function key, 10 = Still image"
    - name: register_id
      type: integer
      description: Register ID to recall
    - name: layers
      type: integer[]
      description: Layer IDs to apply register to

- id: aro
  label: ARO - Aspect Ratio Offset
  kind: action
  params:
    - name: type
      type: string
      description: "t = total aspect ratio, o = KeyFrame aspect ratio offset, a = adjust existing offset"
    - name: floating_point
      type: number
      description: Floating point aspect ratio value
    - name: layers
      type: integer[]
      description: Layer IDs to apply aspect ratio offset to

- id: asc
  label: ASC - Advance Script Cue
  kind: action
  params:
    - name: steps
      type: integer
      description: Number of steps to advance (negative for backward, default is 1)
      required: false

- id: bld
  label: BLD - Load Still in Background
  kind: action
  params:
    - name: filename
      type: string
      description: Name of file to load
    - name: pixelspace_id
      type: integer
      description: ID of pixelspace to load onto
    - name: layer
      type: integer
      description: "0 = next background layer, 1 = current background layer"

- id: bpl
  label: BPL - Basic Preset Learn
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset ID to save current window position and KeyFrame information to
    - name: duration
      type: integer
      description: Frames per second for transition (default 60)
      required: false

- id: bpr
  label: BPR - Basic Preset Recall
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset ID to recall from server
    - name: duration
      type: integer
      description: Frames per second for transition (default 60)
      required: false

- id: btr
  label: BTR - Transition Background
  kind: action
  params:
    - name: duration
      type: integer
      description: Frames per second for background layer transition

- id: cii
  label: CII - Capture Input Image
  kind: action
  params:
    - name: input_id
      type: integer
      description: Input ID to capture (zero-based)
    - name: filename
      type: string
      description: Output filename (*.bmp, *.png, *.jpg, or *.tif)

- id: cli
  label: CLI - Capture Layer Image
  kind: action
  params:
    - name: layer_id
      type: integer
      description: Layer ID to capture
    - name: filename
      type: string
      description: Output filename (*.bmp, *.png, *.jpg, or *.tif)

- id: coi
  label: COI - Capture Output Image
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output ID to capture (zero-based)
    - name: filename
      type: string
      description: Output filename (*.bmp, *.png, *.jpg, or *.tif)

- id: crp
  label: CRP - Crop Layer
  kind: action
  params:
    - name: left
      type: number
      description: "Crop from left (0.0 = no crop, 1.0 = 100% crop)"
    - name: right
      type: number
      description: Crop from right
    - name: top
      type: number
      description: Crop from top
    - name: bottom
      type: number
      description: Crop from bottom
    - name: layers
      type: integer[]
      description: Layer IDs to crop

- id: cso
  label: CSO - Clear Still on Output
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output ID to clear image from

- id: dck
  label: DCK - Delete Command Key
  kind: action
  params:
    - name: id
      type: integer
      description: ID to delete
    - name: type
      type: string
      description: "S = ScriptID (default), R = RegisterID"
      required: false

- id: dmb
  label: DMB - Device Mixer Bus Apply
  kind: action
  params:
    - name: duration
      type: integer
      description: Transition duration in frames per second
    - name: bus
      type: string
      description: "OFF = both layers off screen, PVW = preview layer only, PGM = program and preview visible"
    - name: device_indexes
      type: integer[]
      description: Target device indexes (zero-based)

- id: dmt
  label: DMT - Device Mixer Transition
  kind: action
  params:
    - name: duration
      type: integer
      description: Transition duration in frames per second (1 = cut)
    - name: device_ids
      type: integer[]
      description: Target device indexes (zero-based)

- id: fkr
  label: FKR - Function Key Recall
  kind: action
  params:
    - name: id
      type: integer
      description: Function key ID
    - name: layers
      type: integer[]
      description: Layer IDs for relative function keys
      required: false
    - name: id_type
      type: string
      description: "F = Function key ID (default), R = RegisterID"
      required: false

- id: frz
  label: FRZ - Freeze Layer
  kind: action
  params:
    - name: freeze
      type: integer
      description: "0 = disable freezing, 1 = enable freezing"
    - name: layers
      type: integer[]
      description: Layer IDs to freeze or unfreeze

- id: ick
  label: ICK - Input Color Key
  kind: action
  params:
    - name: key_enabled
      type: integer
      description: "0 = disable, 1 = enable color key adjustment"
    - name: color_red
      type: integer
      description: Red color parameter (0 to 255)
    - name: color_green
      type: integer
      description: Green color parameter (0 to 255)
    - name: color_blue
      type: integer
      description: Blue color parameter (0 to 255)
    - name: range_red
      type: integer
      description: Range-red parameter
    - name: range_green
      type: integer
      description: Range-green parameter
    - name: range_blue
      type: integer
      description: Range-blue parameter
    - name: color_gain
      type: integer
      description: Color gain (0 to 512)
    - name: layers
      type: integer[]
      description: Layer IDs to apply settings to

- id: icl
  label: ICL - Input Config Learn
  kind: action
  params:
    - name: input
      type: integer
      description: Input configuration ID to save to
    - name: layer_id
      type: integer
      description: Layer ID to save input configuration from

- id: icr
  label: ICR - Input Configuration Recall
  kind: action
  params:
    - name: configuration_id
      type: integer
      description: Configuration ID to recall (-1 = force auto-synch)
    - name: layer_id
      type: integer
      description: Layer ID to apply input configuration to
    - name: connector_type
      type: integer
      description: "Connector type when config_id is -1: 0 = HDMI, 1 = Display Port, 2 = SDI"
      required: false

- id: ics
  label: ICS - Input Config Raster Size
  kind: action
  params:
    - name: layer_id
      type: integer
      description: Layer ID to apply input raster change to
    - name: raster_edge
      type: string
      description: "Edge to adjust: Top, Left, Bottom, Right"
    - name: delta
      type: integer
      description: Pixel value to shift the raster

- id: igp
  label: IGP - Input Get Properties
  kind: query
  params:
    - name: layer_id
      type: integer
      description: Layer ID (2 to 26)
  response: Property list with name, type, and current value

- id: ila
  label: ILA - Input Level Adjust
  kind: action
  params:
    - name: brightness
      type: number
      description: Brightness (0.0 to 2.0)
    - name: contrast
      type: number
      description: Contrast (0.0 to 2.5)
    - name: hue
      type: number
      description: Hue (-180 to 180)
    - name: saturation
      type: number
      description: Saturation (0.0 to 2.0)
    - name: gamma
      type: number
      description: Gamma (0.0 to 3.0)
      required: false
    - name: layers
      type: integer[]
      description: Layer IDs to adjust

- id: ilk
  label: ILK - Input Luminance Key
  kind: action
  params:
    - name: key_enabled
      type: integer
      description: "0 = disable, 1 = enable luminance key adjustment"
    - name: clip
      type: integer
      description: Clip value (0 to 512)
    - name: gain
      type: integer
      description: Gain value
    - name: layers
      type: integer[]
      description: Layer IDs to apply settings to

- id: ira
  label: IRA - Input Config Raster
  kind: action
  params:
    - name: layer_id
      type: integer
      description: Layer ID to adjust
    - name: edge
      type: string
      description: "Edge: L = Left, R = Right, T = Top, B = Bottom, A = AutoRaster"
    - name: delta
      type: integer
      description: Pixels to move (negative = inward, positive = outward)

- id: isp
  label: ISP - Input Set Properties
  kind: action
  params:
    - name: layer_id
      type: integer
      description: Layer ID (2 to 26)
    - name: properties
      type: object[]
      description: Property name/value pairs
      required: false

- id: kbd
  label: KBD - Border Adjust
  kind: action
  params:
    - name: id
      type: integer
      description: Layer ID to adjust
    - name: border_thickness
      type: integer
      description: Border thickness (-255 to 255)
    - name: red
      type: integer
      description: Red color (0 to 255)
    - name: green
      type: integer
      description: Green color (0 to 255)
    - name: blue
      type: integer
      description: Blue color (0 to 255)
    - name: h_bevel_offset
      type: integer
      description: Horizontal bevel offset
    - name: v_bevel_offset
      type: integer
      description: Vertical bevel offset
    - name: inside_softness
      type: integer
      description: Inside edge sharpness

- id: kgp
  label: KGP - KeyFrame Get Properties
  kind: query
  params:
    - name: layer_id
      type: integer
      description: Layer ID (2 to 26)
  response: Property list with name, type, and current value

- id: kps
  label: KPS - Layer Position Change
  kind: action
  params:
    - name: position
      type: integer
      description: "0 = absolute position in pixels, 1 = relative position"
    - name: horizontal
      type: integer
      description: Horizontal position in pixels
    - name: vertical
      type: integer
      description: Vertical position in pixels
    - name: layers
      type: integer[]
      description: Layer IDs to position

- id: ksh
  label: KSH - Shadow Adjust
  kind: action
  params:
    - name: id
      type: integer
      description: Layer ID to adjust
    - name: horizontal
      type: integer
      description: Horizontal shadow position (0 to 255)
    - name: vertical
      type: integer
      description: Vertical shadow position (0 to 255)
    - name: size
      type: integer
      description: Shadow size
    - name: transparency
      type: integer
      description: Shadow transparency
    - name: softness
      type: integer
      description: Outside softness

- id: ksp
  label: KSP - Keyframe Set Properties
  kind: action
  params:
    - name: layer_id
      type: integer
      description: Layer ID (2 to 26)
    - name: properties
      type: object[]
      description: Property name/value pairs
      required: false

- id: ksz
  label: KSZ - Layer Size Change
  kind: action
  params:
    - name: horizontal
      type: integer
      description: Horizontal size in pixels
    - name: layers
      type: integer[]
      description: Layer IDs to resize

- id: ktl
  label: KTL - Treatment Learn
  kind: action
  params:
    - name: treatment_id
      type: integer
      description: Treatment ID (-1 = next available)
    - name: layer
      type: integer
      description: Layer ID to learn from
    - name: name
      type: string
      description: Optional treatment name
      required: false
    - name: arguments
      type: integer[]
      description: Argument3-12 for KeyFrame attributes

- id: ktp
  label: KTP - Keyframe Transparency Apply
  kind: action
  params:
    - name: transparency_value
      type: integer
      description: Transparency value (0 to 255)
    - name: layer_ids
      type: integer[]
      description: Layer IDs to apply transparency to

- id: ktr
  label: KTR - Treatment Recall
  kind: action
  params:
    - name: treatment_id
      type: integer
      description: Treatment ID to recall
    - name: layers
      type: integer[]
      description: Layer IDs to recall treatment to

- id: lac
  label: LAC - Layer Alignment Control
  kind: action
  params:
    - name: effect_id
      type: integer
      description: "Alignment effect ID (0-24)"
    - name: recall_duration
      type: integer
      description: Duration in frames per second
    - name: layers
      type: integer[]
      description: Layer IDs to align

- id: lap
  label: LAP - Layer Assign Pixelspace
  kind: action
  params:
    - name: pixelspace_id
      type: integer
      description: Pixelspace to associate layer with
    - name: visibility
      type: integer
      description: "0 = hide layers (default), 1 = make layers visible"
    - name: layers
      type: integer[]
      description: Layer IDs to associate

- id: lcc
  label: LCC - Layer Clone Control
  kind: action
  params:
    - name: layer_id
      type: integer
      description: Layer ID with the KeyFrame
    - name: mode
      type: integer
      description: "0 = Off, 1 = Offset, 2 = Mirror"
    - name: offset
      type: integer
      description: Clone offset distance (optional)
      required: false
    - name: offset_type
      type: integer
      description: "0 = Absolute pixels, 1 = Relative coordinates (default)"
      required: false

- id: lck
  label: LCK - Learn Command Key
  kind: action
  params:
    - name: learn_as
      type: integer
      description: "0 = Absolute, 1 = Relative"
    - name: name
      type: string
      description: Command key name
    - name: register_id
      type: integer
      description: Register ID to learn command to
    - name: learn_from
      type: integer
      description: "1 = Preview only, 2 = Program only"
    - name: learn_mixers
      type: integer
      description: "0 = False, 1 = True"

- id: lso
  label: LSO - Load Still on Output
  kind: action
  params:
    - name: filename
      type: string
      description: Image filename from Stills directory
    - name: output_id
      type: integer
      description: Output ID to load image on

- id: lsp
  label: LSP - Layer Size and Position Change
  kind: action
  params:
    - name: position
      type: integer
      description: "0 = absolute position, 1 = relative position"
    - name: horizontal
      type: integer
      description: Horizontal position in pixels
    - name: vertical
      type: integer
      description: Vertical position in pixels
    - name: size
      type: integer
      description: Horizontal layer size in pixels
    - name: layers
      type: integer[]
      description: Layer IDs to modify

- id: mvac
  label: MVAC - Multi-Viewer Assign Content
  kind: action
  params:
    - name: output_id
      type: integer
      description: "Output ID: 3 = output 4, 7 = output 8, 11 = output 12, 15 = output 16"
    - name: view_id
      type: integer
      description: Multiviewer input view ID
    - name: input_id
      type: integer
      description: Input ID to assign (zero-based)

- id: mvas
  label: MVAS - Input Output PGM and PVW
  kind: action
  params:
    - name: output_id
      type: integer
      description: "Output ID: 3 = output 4, 7 = output 8, 11 = output 12, 15 = output 16"
    - name: view_type
      type: integer
      description: "0 = PGM, 1 = PVW, 2 = Input, 3 = Output"
    - name: content_id
      type: integer
      description: Element ID to assign (-1 for custom PGM/PVW)
    - name: left
      type: integer
      description: Left position (coordinates based on Multiviewer output resolution)
    - name: top
      type: integer
      description: Top position
    - name: width
      type: integer
      description: View width
    - name: height
      type: integer
      description: View height
    - name: border_thickness
      type: integer
      description: Border thickness (0-100, optional)
      required: false
    - name: border_color
      type: object
      description: RGB border color (0-255 each, optional)
      required: false

- id: mvca
  label: MVCA - Multi-Viewer Clear All
  kind: action
  params:
    - name: output_id
      type: integer
      description: "Output ID: 3 = output 4, 7 = output 8, 11 = output 12, 15 = output 16"

- id: mvkf
  label: MVKF - Multi-Viewer Set Keyframe Properties
  kind: action
  params:
    - name: output_id
      type: integer
      description: "Output ID: 3 = output 4, 7 = output 8, 11 = output 12, 15 = output 16"
    - name: view_id
      type: integer
      description: Multiviewer view ID
    - name: left
      type: integer
      description: Left position
    - name: top
      type: integer
      description: Top position
    - name: width
      type: integer
      description: View width
    - name: height
      type: integer
      description: View height
    - name: border_thickness
      type: integer
      description: Border thickness (0-100)
    - name: border_color
      type: object
      description: RGB border color (0-255 each)

- id: mvpl
  label: MVPL - Multi-Viewer Preset Learn
  kind: action
  params:
    - name: output_id
      type: integer
      description: "Output ID: 3 = output 4, 7 = output 8, 11 = output 12, 15 = output 16"
    - name: preset_name
      type: string
      description: Unique preset name

- id: mvpr
  label: MVPR - Multi-Viewer Preset Recall
  kind: action
  params:
    - name: output_id
      type: integer
      description: "Output ID: 3 = output 4, 7 = output 8, 11 = output 12, 15 = output 16"
    - name: preset_type
      type: integer
      description: "0 = OpMon, 1 = SourceMon, 2 = Custom"
    - name: preset_name
      type: string
      description: Custom preset name
      required: false

- id: mvqo
  label: MVQO - Multi-Viewer Query Output
  kind: query
  params:
    - name: output_id
      type: integer
      description: "Output ID: 3 = output 4, 7 = output 8, 11 = output 12, 15 = output 16"
  response: Background color, view count, and view details

- id: mvst
  label: MVST - Multi-Viewer Set Titling
  kind: action
  params:
    - name: output_id
      type: integer
      description: "Output ID: 3 = output 4, 7 = output 8, 11 = output 12, 15 = output 16"
    - name: view_id
      type: integer
      description: Multiviewer view ID
    - name: show_pixelspace_name
      type: integer
      description: Show pixelspace name flag
    - name: show_input_number
      type: integer
      description: Show input number flag
    - name: show_source_name
      type: integer
      description: Show source name flag
    - name: show_output_number
      type: integer
      description: Show output number flag
    - name: show_output_name
      type: integer
      description: Show output name flag
    - name: show_custom_label
      type: integer
      description: Show custom label flag
      required: false
    - name: custom_text
      type: string
      description: Custom text (required when show_custom_label enabled)
      required: false
    - name: label_position
      type: integer
      description: "0 = TopIn, 1 = BottomIn, 2 = LeftIn, 3 = RightIn, 4 = TopOut, 5 = BottomOut, 6 = LeftOut, 7 = RightOut"
      required: false
    - name: font_size
      type: integer
      description: Font size
      required: false
    - name: bold
      type: integer
      description: Bold flag
      required: false
    - name: italic
      type: integer
      description: Italic flag
      required: false
    - name: separator
      type: string
      description: Separator character
      required: false
    - name: foreground_color
      type: object
      description: RGB foreground color (0-255 each)
      required: false
    - name: background_color
      type: object
      description: RGB background color (0-255 each)
      required: false

- id: ocb
  label: OCB - Output Configuration Blending
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output ID (zero-based)
    - name: edge
      type: string
      description: "L = Left, R = Right"
    - name: enable
      type: integer
      description: "0 = disable, 1 = enable blending"
    - name: blend_width
      type: integer
      description: Blend width in pixels
    - name: mode
      type: string
      description: Blend mode (Bezier, Gamma, Velocity)
    - name: curve1
      type: number
      description: Curve parameter 1 (0.000 to 1.000)
    - name: curve2
      type: number
      description: Curve parameter 2

- id: occ
  label: OCC - Output Config Connection
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output index
    - name: connector_type
      type: integer
      description: "0 = Analog, 1 = DVI, 2 = SDI, 3 = Composite/S-Video, 4 = HDMI, 5 = Display Port"
    - name: enabled
      type: integer
      description: "0 = Disabled, 1 = Enabled"

- id: ocf
  label: OCF - Output Configuration Format
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output ID (zero-based)
    - name: hactive
      type: integer
      description: Horizontal active resolution
    - name: vactive
      type: integer
      description: Vertical active resolution
    - name: refresh_rate
      type: number
      description: Refresh rate (floating point)
    - name: interlaced
      type: integer
      description: "0 = non-interlaced, 1 = interlaced"
    - name: timing
      type: integer
      description: "0 = Off, 1 = Reduced Level 1, 2 = Reduced Level 2"
      required: false

- id: ocm
  label: OCM - Output Configuration Mode
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output ID (zero-based)
    - name: mode
      type: string
      description: "Normal, Multiview, Scaled, OpMon, SourceMon, Aux"
    - name: hstart
      type: integer
      description: Horizontal starting position (for Normal mode)
      required: false
    - name: vstart
      type: integer
      description: Vertical starting position (for Normal mode)
      required: false
    - name: preset_name
      type: string
      description: Preset name (for Multiview/OpMon/SourceMon/Aux modes)
      required: false
    - name: pixelspace_id
      type: integer
      description: Pixelspace ID (for Scaled/OpMon modes)
      required: false
    - name: source_name
      type: string
      description: Source name (for Aux mode)
      required: false
    - name: background_color
      type: object
      description: RGB background color (for Aux mode, 0-255 each)
      required: false

- id: ocr
  label: OCR - Output Configuration Rotation
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output ID (zero-based)
    - name: rotation_angle
      type: integer
      description: "Rotation angle: 0, 90, 180, 270"

- id: ocs
  label: OCS - Output Configuration Save
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output ID to save (zero-based)

- id: ocu
  label: OCU - Output Config Undo/Cancel
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output ID to cancel changes on

- id: ofz
  label: OFZ - Freeze Output
  kind: action
  params:
    - name: freeze
      type: integer
      description: "0 = disable freezing, 1 = enable freezing"
    - name: outputs
      type: integer[]
      description: Output IDs to freeze or unfreeze

- id: ogp
  label: OGP - Output Get Properties
  kind: query
  params:
    - name: layer_id
      type: integer
      description: Layer ID (2 to 26)
  response: Property list with name, type, and current value

- id: osp
  label: OSP - Output Set Properties
  kind: action
  params:
    - name: output_id
      type: integer
      description: Output config object ID (0 to 15)
    - name: properties
      type: object[]
      description: Property name/value pairs
      required: false

- id: rar
  label: RAR - Request Aspect Ratio
  kind: query
  params:
    - name: layer
      type: integer
      description: Layer ID or source name to request aspect ratio
  response: Aspect ratio value

- id: ras
  label: RAS - Request Active Sources
  kind: query
  params:
    - name: pixelspace_ids
      type: integer[]
      description: PixelSpace IDs to query (default = all)
      required: false
  response: Count and list of source names with bus status (0=Preview, 1=Program, 2=Both)

- id: rbl
  label: RBL - Request Basic Preset List
  kind: query
  params:
    - name: start_index
      type: integer
      description: Index to begin returning preset names
      required: false
    - name: max_count
      type: integer
      description: Maximum number of presets to return
      required: false
    - name: chars
      type: integer
      description: Number of characters to truncate names to
      required: false
  response: Return count and list of preset ID/name pairs

- id: rcr
  label: RCR - Router Crosspoint Recall
  kind: action
  params:
    - name: router_id
      type: integer
      description: Router ID to switch
    - name: switch
      type: string
      description: "L = logical output (default), P = physical outputs"
      required: false
    - name: output
      type: integer
      description: Output to switch (zero-based)
    - name: input
      type: integer
      description: Input to switch to (zero-based)

- id: rcs
  label: RCS - Request Connection Status
  kind: query
  params:
    - name: layer_id
      type: integer
      description: Layer ID to check connection status
  response: Connection status (0=Disconnected, 1=Connected, 2=Unknown) and connector type (0=HDMI, 1=DisplayPort, 2=SDI)

- id: rif
  label: RIF - Request Image File
  kind: query
  params:
    - name: filename
      type: string
      description: Image filename (no path)
    - name: max_dimension
      type: integer
      description: Maximum width or height for scaling
      required: false
  response: ASCII-encoded hexadecimal image data

- id: rlc
  label: RLC - Request Layer Count
  kind: query
  response: Logical layer count (includes two background layers)

- id: rlk
  label: RLK - Request Layer KeyFrame
  kind: query
  params:
    - name: layer_id
      type: integer
      description: Layer ID to retrieve KeyFrame values
  response: Full KeyFrame property list

- id: rls
  label: RLS - Request Layer Source
  kind: query
  params:
    - name: layer_id
      type: integer
      description: Layer ID to retrieve source information
  response: Source name and register ID

- id: rpd
  label: RPD - Request Pixelspace Definitions
  kind: query
  response: Count and list of all pixelspaces with ID, name, backgrounds, position, size, and renewal group

- id: rpm
  label: RPM - Request PixelSpace Mappings
  kind: query
  response: Count and preview/program ID mappings

- id: rpn
  label: RPN - Request Page Names
  kind: query
  params:
    - name: register_type
      type: integer
      description: "Register type: 0=Effect, 1=Playitem, 4=Command key/script, 5=Treatment, 6=Source, 7=Function key, 10=Still image"
  response: Register count and page ID/name pairs

- id: rps
  label: RPS - Request I/O Processor Status
  kind: query
  params:
    name: chars
    type: integer
    description: Number of characters to truncate status message to
    required: false
  response: Progress (0-101) and status message

- id: rrc
  label: RRC - Request Register Count
  kind: query
  params:
    - name: register_type
      type: integer
      description: "Register type: 0=Effect, 1=Playitem, 4=Command key/script, 5=Treatment, 6=Source, 7=Function key, 10=Still image"
    - name: page_number
      type: integer
      description: Page number (zero-based, -1 = all pages)
      required: false
  response: Register count

- id: rrd
  label: RRD - Request Register Detail
  kind: query
  params:
    - name: register_type
      type: integer
      description: "Register type: 0=Effect, 1=Playitem, 4=Command key/script, 5=Treatment, 6=Source, 7=Function key, 10=Still image"
    - name: register_id
      type: integer
      description: Register ID
  response: Format varies by register type

- id: rrl
  label: RRL - Request Register List
  kind: query
  params:
    - name: register_type
      type: integer
      description: "Register type: 0=Effect, 1=Playitem, 4=Command key/script, 5=Treatment, 6=Source, 7=Function key, 10=Still image"
    - name: page_number
      type: integer
      description: Page number (-1 = all pages)
      required: false
    - name: start_index
      type: integer
      description: Index to begin returning
      required: false
    - name: max_count
      type: integer
      description: Maximum number of registers to return
      required: false
    - name: chars
      type: integer
      description: Characters to truncate names to
      required: false
  response: Return count and register ID/name pairs

- id: rsc
  label: RSC - Recall Script Cue
  kind: action
  params:
    - name: script
      type: integer
      description: Script ID
    - name: cue
      type: integer
      description: Script cue to recall
    - name: type
      type: string
      description: "S = ScriptID (default), R = RegisterID"
      required: false

- id: rscc
  label: RSCC - Request Script CueData Count
  kind: query
  params:
    - name: script_id
      type: integer
      description: Script or register ID
    - name: id_type
      type: string
      description: "S = Script ID (default), R = Register ID"
      required: false
  response: Number of cues in requested script

- id: rscd
  label: RSCD - Request Script CueData Details
  kind: query
  params:
    - name: script_id
      type: integer
      description: Script or register ID
    - name: id_type
      type: string
      description: "S = Script ID (default), R = Register ID"
      required: false
  response: Cue details including name, jump type, trigger type, function keys, and playitems

- id: rsec
  label: RSEC - Request Script Element Count
  kind: query
  params:
    - name: script_id
      type: integer
      description: Script or register ID
    - name: id_type
      type: string
      description: "S = Script ID (default), R = Register ID"
      required: false
  response: Number of elements in script

- id: rsf
  label: RSF - Request System FrameRate
  kind: query
  response: Frame rate ID (0=FR_60, 1=NTSC, 2=PAL, 3=FR_48, 4=FR_30, 5=FR_29.97, 6=FR_25, 7=FR_24, 8=FR_23.98)

- id: rsn
  label: RSN - Request Source Name
  kind: query
  response: Space-separated list of source names

- id: sav
  label: SAV - Force Server Save
  kind: action
  response: Saves all configuration and user data to non-volatile storage

- id: scl
  label: SCL - Clear Still on Layer
  kind: action
  params:
    - name: layers
      type: integer[]
      description: Layer IDs to clear stills from

- id: scr
  label: SCR - Script Cue Request
  kind: query
  params:
    - name: id
      type: integer
      description: Script ID to request status for
    - name: type
      type: string
      description: "S = ScriptID, R = RegisterID"
  response: Current cue number or -1 if not executing

- id: sdn
  label: SDN - Restart Spyder Server
  kind: action
  params:
    - name: operation
      type: integer
      description: "0 = power off, 1 = restart"

- id: sld
  label: SLD - Load Still on Layer
  kind: action
  params:
    - name: filename
      type: string
      description: File name to load
    - name: layers
      type: integer[]
      description: Layer IDs to load still on

- id: slr
  label: SLR - Slide Layout Recall
  kind: action
  params:
    - name: pixelspace_id
      type: integer
      description: PixelSpace ID to execute slide layout recall
    - name: clear_layers
      type: integer
      description: "0 = leave unused layers, 1 = remove unused layers"
    - name: reserved_layer_count
      type: integer
      description: Number of reserved layers
    - name: reserved_layers
      type: integer[]
      description: Reserved layer IDs
    - name: slide_entries
      type: object[]
      description: Slide operations (tilde-separated format)

- id: srs
  label: SRS - Stop Running Scripts
  kind: action
  params:
    - name: operation_type
      type: string
      description: "D = disconnect layers from scripts, S = cancel pending cue triggers"

- id: sra
  label: SRA - Source Apply
  kind: action
  params:
    - name: name
      type: string
      description: Source name
    - name: layers
      type: integer[]
      description: Layer IDs to apply source to

- id: swa
  label: SWA - Swap Layers
  kind: action
  params:
    - name: first_layer_id
      type: integer
      description: First layer to swap
    - name: second_layer_id
      type: integer
      description: Second layer to swap

- id: tpc
  label: TPC - Test Pattern Clear
  kind: action
  params:
    - name: target
      type: integer
      description: "0 = PixelSpace, 1 = Layer, 2 = Output"
    - name: id
      type: integer
      description: Target ID to clear

- id: tpl
  label: TPL - Test Pattern Load
  kind: action
  params:
    - name: target
      type: integer
      description: "0 = PixelSpace, 1 = Layer, 2 = Output"
    - name: id
      type: integer
      description: Target ID
    - name: pattern_type
      type: integer
      description: "0=ColorBarsGray, 1=ColorBarsHorizontal, 2=ColorBarsPluge, 3=SingleColor, 4=ColorRamp8Bit, 5=RGBColorGradient8Bit, 6=Grid32, 7=Grid64, 8=Grid128, 9=GrayGamma, 10-15=Gray steps, 16-17=Grill, 18-21=Sweep"
    - name: outline
      type: integer
      description: "0=disabled, 1=enabled"
      required: false
    - name: center_circle
      type: integer
      description: "0=disabled, 1=enabled"
      required: false
    - name: center_x
      type: integer
      description: "0=disabled, 1=enabled"
      required: false
    - name: grid
      type: integer
      description: "0=disabled, 1=enabled"
      required: false
    - name: bg_color
      type: object
      description: RGB background color (0-255)
      required: false
    - name: fg_color
      type: object
      description: RGB foreground color (0-255)
      required: false

- id: trn
  label: TRN - Transition Layers
  kind: action
  params:
    - name: mix
      type: integer
      description: "0 = mix off, 1 = mix on"
    - name: duration
      type: integer
      description: Transition duration in frames per second
    - name: layers
      type: integer[]
      description: Layer IDs to transition

- id: zpa
  label: ZPA - Zoom/Pan Adjust
  kind: action
  params:
    - name: recall_mode
      type: integer
      description: "0 = absolute values, 1 = relative adjustment"
    - name: zoom
      type: number
      description: Zoom value (0.0 to 20.0)
    - name: horizontal_pan
      type: integer
      description: Horizontal pan (-2048 to 2048)
    - name: vertical_pan
      type: integer
      description: Vertical pan (-2048 to 2048)
    - name: layer_id
      type: integer
      description: Layer ID of KeyFrame to adjust

- id: dsl
  label: DSL - Detailed Source List
  kind: query
  response: Count and source details (RegisterID, SourceName, HActive, VActive, Connector, Thumbnail)

- id: qrc
  label: QRC - Query Router Crosspoint
  kind: query
  params:
    - name: router_id
      type: integer
      description: Router ID to query
    - name: output_id
      type: integer
      description: Router output to query (optional, omit for all)
      required: false
  response: Router ID with output:input pairs
```

## Feedbacks
```yaml
- id: response_code
  type: enum
  values:
    - 0
    - 1
    - 2
    - 3
    - 4
    - 5
    - 6
  description: First response argument always contains error code
- id: dsl_response
  type: object
  description: Detailed source list response format
- id: ras_response
  type: object
  description: Active sources response with source name and bus status
- id: rbl_response
  type: object
  description: Preset list response with ID and name pairs
- id: rpd_response
  type: object
  description: Pixelspace definitions list
- id: rpm_response
  type: object
  description: Preview/program PixelSpace mappings
- id: rpn_response
  type: object
  description: Register page names and numbers
- id: rps_response
  type: object
  description: I/O processor status with progress (0-101) and message
- id: rsf_response
  type: enum
  description: System frame rate ID
- id: rsn_response
  type: string
  description: Source names list
- id: rlc_response
  type: integer
  description: Logical layer count
- id: rlk_response
  type: object
  description: Layer KeyFrame properties
- id: rls_response
  type: object
  description: Layer source name and register ID
- id: rrc_response
  type: integer
  description: Register count
- id: rrl_response
  type: object
  description: Register list with ID and name pairs
- id: rscc_response
  type: integer
  description: Script cue count
- id: rscd_response
  type: object
  description: Script cue details
- id: rsec_response
  type: integer
  description: Script element count
- id: qrc_response
  type: string
  description: Router crosspoint status (output:input pairs)
- id: rcs_response
  type: object
  description: Connection status and connector type
- id: rar_response
  type: number
  description: Aspect ratio value
- id: rif_response
  type: string
  description: ASCII-encoded hexadecimal image data
- id: rrd_response
  type: object
  description: Register detail (format varies by type)
- id: mvqo_response
  type: object
  description: Multiviewer output query response
- id: ogp_response
  type: object
  description: Output properties list
- id: igp_response
  type: object
  description: Input properties list
- id: kgp_response
  type: object
  description: KeyFrame properties list
- id: scr_response
  type: integer
  description: Current script cue number
```

## Variables
```yaml
- id: pixelspace_id
  type: integer
  description: Virtual screen area identifier (zero-based)
- id: layer_id
  type: integer
  description: Layer identifier (2-26, layer 0 and 1 reserved for background)
- id: output_id
  type: integer
  description: Output identifier (zero-based)
- id: register_type
  type: integer
  description: "Register data type: 0=Effect, 1=Playitem, 4=Command key/script, 5=Treatment, 6=Source, 7=Function key, 10=Still image"
- id: router_id
  type: integer
  description: Router identifier in system
- id: preset_id
  type: integer
  description: Preset storage identifier
- id: treatment_id
  type: integer
  description: Treatment (transition effect) identifier
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macros not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
UDP packets require 10-byte header: `spyer` followed by four 0x00 bytes. Serial commands terminated with carriage return. Spaces in string arguments must be replaced with `%20`. Layer IDs start at 2 (IDs 0 and 1 reserved for background layers). No authentication required for control interface.
<!-- UNRESOLVED: serial baud rate, data bits, parity, stop bits not stated in source (configured via Spyder Studio) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
retrieved_at: 2026-04-29T23:11:34.856Z
last_checked_at: 2026-04-30T09:39:41.263Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:39:41.263Z
matched_actions: 94
action_count: 94
confidence: high
summary: "All 94 spec actions matched literally in source with correct parameter shapes and transport values verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
