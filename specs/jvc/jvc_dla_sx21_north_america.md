---
spec_id: admin/jvc-dla-sx21-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DLA-SX21 Control Spec"
manufacturer: JVC
model_family: DLA-SX21
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-SX21
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - http://www.support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:43.669Z
last_checked_at: 2026-05-14T18:17:17.238Z
generated_at: 2026-05-14T18:17:17.238Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.238Z
  matched_actions: 159
  action_count: 225
  confidence: high
  summary: "All actions, feedback values, and transport parameters verified against source RS-232C/LAN control guide. Spec correctly notes model not explicitly listed in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# JVC DLA-SX21 Control Spec

## Summary
JVC DLA-SX21 North America projector. Control via RS-232C (19200 bps 8N1) and LAN (TCP port 20554). Direct commands and Remote Control Emulation commands documented. Hex payload format with acknowledgement responses.

<!-- UNRESOLVED: DLA-SX21 not listed in source document model roster; this spec derived from general JVC projector RS-232C/LAN control guide -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 20554  # TCP port for LAN control
auth:
  type: none  # inferred: no auth procedure in source
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
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_on
  label: Power On
  kind: action
  params: []
- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  params: []
- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  params: []
- id: input_component
  label: Input Component
  kind: action
  params: []
- id: input_svideo
  label: Input S-Video
  kind: action
  params: []
- id: input_video
  label: Input Video
  kind: action
  params: []
- id: input_pc
  label: Input PC
  kind: action
  params: []
- id: input_next
  label: Input Next
  kind: action
  params: []
- id: input_prev
  label: Input Previous
  kind: action
  params: []
- id: testpattern_off
  label: Test Pattern Off
  kind: action
  params: []
- id: testpattern_colourbars
  label: Test Pattern Colour Bars
  kind: action
  params: []
- id: testpattern_stairstep_bw
  label: Test Pattern Stairstep Black/White
  kind: action
  params: []
- id: testpattern_stairstep_red
  label: Test Pattern Stairstep Red
  kind: action
  params: []
- id: testpattern_stairstep_green
  label: Test Pattern Stairstep Green
  kind: action
  params: []
- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep Blue
  kind: action
  params: []
- id: testpattern_crosshatch
  label: Test Pattern Crosshatch Green
  kind: action
  params: []
- id: gamma_normal
  label: Gamma Normal
  kind: action
  params: []
- id: gamma_a
  label: Gamma A
  kind: action
  params: []
- id: gamma_b
  label: Gamma B
  kind: action
  params: []
- id: gamma_c
  label: Gamma C
  kind: action
  params: []
- id: gamma_d
  label: Gamma D
  kind: action
  params: []
- id: gamma_custom1
  label: Gamma Custom 1
  kind: action
  params: []
- id: gamma_custom2
  label: Gamma Custom 2
  kind: action
  params: []
- id: gamma_custom3
  label: Gamma Custom 3
  kind: action
  params: []
- id: gammavalue_1_8
  label: Gamma Value 1.8
  kind: action
  params: []
- id: gammavalue_1_9
  label: Gamma Value 1.9
  kind: action
  params: []
- id: gammavalue_2_0
  label: Gamma Value 2.0
  kind: action
  params: []
- id: gammavalue_2_1
  label: Gamma Value 2.1
  kind: action
  params: []
- id: gammavalue_2_2
  label: Gamma Value 2.2
  kind: action
  params: []
- id: gammavalue_2_3
  label: Gamma Value 2.3
  kind: action
  params: []
- id: gammavalue_2_4
  label: Gamma Value 2.4
  kind: action
  params: []
- id: gammavalue_2_5
  label: Gamma Value 2.5
  kind: action
  params: []
- id: gammavalue_2_6
  label: Gamma Value 2.6
  kind: action
  params: []
- id: offtimer_off
  label: Off Timer Off
  kind: action
  params: []
- id: offtimer_1hr
  label: Off Timer Set 1 Hour
  kind: action
  params: []
- id: offtimer_2hr
  label: Off Timer Set 2 Hours
  kind: action
  params: []
- id: offtimer_3hr
  label: Off Timer Set 3 Hours
  kind: action
  params: []
- id: offtimer_4hr
  label: Off Timer Set 4 Hours
  kind: action
  params: []
- id: lampusernormal
  label: Lamp Power Normal
  kind: action
  params: []
- id: lamppowerhigh
  label: Lamp Power High
  kind: action
  params: []
- id: remote_code_a
  label: Remote Code A
  kind: action
  params: []
- id: remote_code_b
  label: Remote Code B
  kind: action
  params: []
- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
- id: trigger_power
  label: Trigger On Power
  kind: action
  params: []
- id: trigger_anamorphic
  label: Trigger On Anamorphic
  kind: action
  params: []
- id: clearmotion_off
  label: Clear Motion Drive Off
  kind: action
  params: []
- id: clearmotion_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  params: []
- id: clearmotion_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  params: []
- id: clearmotion_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []
- id: clearmotion_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []
- id: clearmotion_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  params: []
- id: anamorphic_off
  label: Anamorphic Off
  kind: action
  params: []
- id: anamorphic_a
  label: Anamorphic A
  kind: action
  params: []
- id: anamorphic_b
  label: Anamorphic B
  kind: action
  params: []
- id: picturemode_film
  label: Picture Mode Film
  kind: action
  params: []
- id: picturemode_cinema
  label: Picture Mode Cinema
  kind: action
  params: []
- id: picturemode_animation
  label: Picture Mode Animation
  kind: action
  params: []
- id: picturemode_natural
  label: Picture Mode Natural
  kind: action
  params: []
- id: picturemode_stage
  label: Picture Mode Stage
  kind: action
  params: []
- id: picturemode_thx
  label: Picture Mode THX
  kind: action
  params: []
- id: picturemode_3d
  label: Picture Mode 3D
  kind: action
  params: []
- id: picturemode_user1
  label: Picture Mode User 1
  kind: action
  params: []
- id: picturemode_user2
  label: Picture Mode User 2
  kind: action
  params: []
- id: picturemode_user3
  label: Picture Mode User 3
  kind: action
  params: []
- id: picturemode_user4
  label: Picture Mode User 4
  kind: action
  params: []
- id: picturemode_user5
  label: Picture Mode User 5
  kind: action
  params: []
- id: colourprofile_off
  label: Colour Profile Off
  kind: action
  params: []
- id: colourprofile_film1
  label: Colour Profile Film 1
  kind: action
  params: []
- id: colourprofile_film2
  label: Colour Profile Film 2
  kind: action
  params: []
- id: colourprofile_standard
  label: Colour Profile Standard
  kind: action
  params: []
- id: colourprofile_cinema1
  label: Colour Profile Cinema 1
  kind: action
  params: []
- id: colourprofile_cinema2
  label: Colour Profile Cinema 2
  kind: action
  params: []
- id: colourprofile_anime1
  label: Colour Profile Anime 1
  kind: action
  params: []
- id: colourprofile_anime2
  label: Colour Profile Anime 2
  kind: action
  params: []
- id: colourprofile_video
  label: Colour Profile Video
  kind: action
  params: []
- id: colourprofile_vivid
  label: Colour Profile Vivid
  kind: action
  params: []
- id: colourprofile_adobe
  label: Colour Profile Adobe
  kind: action
  params: []
- id: colourprofile_stage
  label: Colour Profile Stage
  kind: action
  params: []
- id: colourprofile_3d
  label: Colour Profile 3D
  kind: action
  params: []
- id: colourprofile_thx
  label: Colour Profile THX
  kind: action
  params: []
- id: format_3d_off
  label: 3D Format Off (2D)
  kind: action
  params: []
- id: format_3d_auto
  label: 3D Format Auto
  kind: action
  params: []
- id: format_3d_frame_packing
  label: 3D Format Frame Packing
  kind: action
  params: []
- id: format_3d_side_by_side
  label: 3D Format Side by Side
  kind: action
  params: []
- id: format_3d_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  params: []
- id: convert2d3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
- id: convert2d3d_on
  label: 2D to 3D Conversion On
  kind: action
  params: []
- id: subtitle3d_off
  label: 3D Subtitle Correction Off
  kind: action
  params: []
- id: subtitle3d_on
  label: 3D Subtitle Correction On
  kind: action
  params: []
- id: lensmem_save1
  label: Lens Memory Save Memory 1
  kind: action
  params: []
- id: lensmem_save2
  label: Lens Memory Save Memory 2
  kind: action
  params: []
- id: lensmem_save3
  label: Lens Memory Save Memory 3
  kind: action
  params: []
- id: lensmem_select1
  label: Lens Memory Select Memory 1
  kind: action
  params: []
- id: lensmem_select2
  label: Lens Memory Select Memory 2
  kind: action
  params: []
- id: lensmem_select3
  label: Lens Memory Select Memory 3
  kind: action
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  params: []
- id: contrast_up
  label: Contrast Up
  kind: action
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  params: []
- id: colour_up
  label: Colour Up
  kind: action
  params: []
- id: colour_down
  label: Colour Down
  kind: action
  params: []
- id: tint_up
  label: Tint Up
  kind: action
  params: []
- id: tint_down
  label: Tint Down
  kind: action
  params: []
- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []
- id: lensfocus_up
  label: Lens Focus Up
  kind: action
  params: []
- id: lensfocus_down
  label: Lens Focus Down
  kind: action
  params: []
- id: lenszoom_in
  label: Lens Zoom In
  kind: action
  params: []
- id: lenszoom_out
  label: Lens Zoom Out
  kind: action
  params: []
- id: lensshift_up
  label: Lens Shift Up
  kind: action
  params: []
- id: lensshift_down
  label: Lens Shift Down
  kind: action
  params: []
- id: lensshift_left
  label: Lens Shift Left
  kind: action
  params: []
- id: lensshift_right
  label: Lens Shift Right
  kind: action
  params: []
- id: menu
  label: Menu Toggle
  kind: action
  params: []
- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
- id: ok
  label: OK
  kind: action
  params: []
- id: back
  label: Back
  kind: action
  params: []
- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
- id: hide_on
  label: Hide On
  kind: action
  params: []
- id: hide_off
  label: Hide Off
  kind: action
  params: []
- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  params: []
- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  params: []
- id: aspect_zoom
  label: Aspect Zoom
  kind: action
  params: []
- id: keystone_v_up
  label: Keystone Vertical Up
  kind: action
  params: []
- id: keystone_v_down
  label: Keystone Vertical Down
  kind: action
  params: []
- id: keystone_h_up
  label: Keystone Horizontal Up
  kind: action
  params: []
- id: keystone_h_down
  label: Keystone Horizontal Down
  kind: action
  params: []
- id: colour_management_off
  label: Colour Management Off
  kind: action
  params: []
- id: colour_management_custom1
  label: Colour Management Custom 1
  kind: action
  params: []
- id: colour_management_custom2
  label: Colour Management Custom 2
  kind: action
  params: []
- id: colour_management_custom3
  label: Colour Management Custom 3
  kind: action
  params: []
- id: colour_management_cycle
  label: Colour Management Cycle
  kind: action
  params: []
- id: cti_off
  label: CTI Off
  kind: action
  params: []
- id: cti_low
  label: CTI Low
  kind: action
  params: []
- id: cti_middle
  label: CTI Middle
  kind: action
  params: []
- id: cti_high
  label: CTI High
  kind: action
  params: []
- id: cec_off
  label: CEC Off
  kind: action
  params: []
- id: cec_on
  label: CEC On
  kind: action
  params: []
- id: detail_enhance_down
  label: Detail Enhance Down
  kind: action
  params: []
- id: detail_enhance_up
  label: Detail Enhance Up
  kind: action
  params: []
- id: dark_level_down
  label: Dark Level Down
  kind: action
  params: []
- id: dark_level_up
  label: Dark Level Up
  kind: action
  params: []
- id: bright_level_down
  label: Bright Level Down
  kind: action
  params: []
- id: bright_level_up
  label: Bright Level Up
  kind: action
  params: []
- id: picture_tone_blue_down
  label: Picture Tone Blue Down
  kind: action
  params: []
- id: picture_tone_blue_up
  label: Picture Tone Blue Up
  kind: action
  params: []
- id: picture_tone_green_down
  label: Picture Tone Green Down
  kind: action
  params: []
- id: picture_tone_green_up
  label: Picture Tone Green Up
  kind: action
  params: []
- id: picture_tone_red_down
  label: Picture Tone Red Down
  kind: action
  params: []
- id: picture_tone_red_up
  label: Picture Tone Red Up
  kind: action
  params: []
- id: picture_tone_white_down
  label: Picture Tone White Down
  kind: action
  params: []
- id: picture_tone_white_up
  label: Picture Tone White Up
  kind: action
  params: []
- id: screen_adjust_off
  label: Screen Adjust Off
  kind: action
  params: []
- id: screen_adjust_a
  label: Screen Adjust A
  kind: action
  params: []
- id: screen_adjust_b
  label: Screen Adjust B
  kind: action
  params: []
- id: screen_adjust_c
  label: Screen Adjust C
  kind: action
  params: []
- id: isf_day
  label: ISF Day
  kind: action
  params: []
- id: isf_night
  label: ISF Night
  kind: action
  params: []
- id: isf_off
  label: ISF Off
  kind: action
  params: []
- id: isf_on
  label: ISF On
  kind: action
  params: []
- id: nr_toggle
  label: NR Toggle
  kind: action
  params: []
- id: thx_bright
  label: THX Bright
  kind: action
  params: []
- id: thx_dark
  label: THX Dark
  kind: action
  params: []
- id: thx_off
  label: THX Off
  kind: action
  params: []
- id: thx_on
  label: THX On
  kind: action
  params: []
- id: shutter_sync_off
  label: Shutter Sync Off
  kind: action
  params: []
- id: shutter_sync_on
  label: Shutter Sync On
  kind: action
  params: []
- id: lens_aperture_1
  label: Lens Aperture 1
  kind: action
  params: []
- id: lens_aperture_2
  label: Lens Aperture 2
  kind: action
  params: []
- id: lens_aperture_3
  label: Lens Aperture 3
  kind: action
  params: []
- id: lens_aperture_down
  label: Lens Aperture Down
  kind: action
  params: []
- id: lens_aperture_up
  label: Lens Aperture Up
  kind: action
  params: []
- id: lens_aperture_adj
  label: Lens Aperture Adj
  kind: action
  params: []
- id: bnr_off
  label: BNR Off
  kind: action
  params: []
- id: bnr_on
  label: BNR On
  kind: action
  params: []
- id: mnr_down
  label: MNR Down
  kind: action
  params: []
- id: mnr_up
  label: MNR Up
  kind: action
  params: []
- id: rnr_down
  label: RNR Down
  kind: action
  params: []
- id: rnr_up
  label: RNR Up
  kind: action
  params: []
- id: null_command
  label: Null Command
  kind: action
  params: []
- id: advanced
  label: Advanced
  kind: action
  params: []
- id: information
  label: Information
  kind: action
  params: []
- id: picture_adjust
  label: Picture Adjust
  kind: action
  params: []
- id: aspect_next
  label: Aspect Next
  kind: action
  params: []
- id: aspect_pc_auto
  label: Aspect PC Auto
  kind: action
  params: []
- id: aspect_pc_full
  label: Aspect PC Full
  kind: action
  params: []
- id: aspect_pc_just
  label: Aspect PC Just
  kind: action
  params: []
- id: auto_lens_centre
  label: Auto Lens Centre
  kind: action
  params: []
- id: colourprofile_cycle
  label: Colour Profile Cycle
  kind: action
  params: []
- id: colour_space_cycle
  label: Colour Space Cycle
  kind: action
  params: []
- id: colour_temp_6500k
  label: Colour Temp 6500K
  kind: action
  params: []
- id: colour_temp_custom1
  label: Colour Temp Custom 1
  kind: action
  params: []
- id: colour_temp_custom2
  label: Colour Temp Custom 2
  kind: action
  params: []
- id: colour_temp_custom3
  label: Colour Temp Custom 3
  kind: action
  params: []
- id: colour_temp_next
  label: Colour Temp Next
  kind: action
  params: []
- id: gamma_next
  label: Gamma Next
  kind: action
  params: []
- id: hide_toggle
  label: Hide Toggle
  kind: action
  params: []
- id: horizontal_position_down
  label: Horizontal Position Down
  kind: action
  params: []
- id: horizontal_position_up
  label: Horizontal Position Up
  kind: action
  params: []
- id: vertical_position_down
  label: Vertical Position Down
  kind: action
  params: []
- id: vertical_position_up
  label: Vertical Position Up
  kind: action
  params: []
- id: mask_bottom_down
  label: Mask Bottom Down
  kind: action
  params: []
- id: mask_bottom_up
  label: Mask Bottom Up
  kind: action
  params: []
- id: mask_left_down
  label: Mask Left Down
  kind: action
  params: []
- id: mask_left_up
  label: Mask Left Up
  kind: action
  params: []
- id: mask_right_down
  label: Mask Right Down
  kind: action
  params: []
- id: mask_right_up
  label: Mask Right Up
  kind: action
  params: []
- id: mask_top_down
  label: Mask Top Down
  kind: action
  params: []
- id: mask_top_up
  label: Mask Top Up
  kind: action
  params: []
- id: menu_position
  label: Menu Position
  kind: action
  params: []
- id: lens_control_cycle
  label: Lens Control Cycle
  kind: action
  params: []
- id: sharpness_adj
  label: Sharpness Adj
  kind: action
  params: []
- id: contrast_adj
  label: Contrast Adj
  kind: action
  params: []
- id: colour_adj
  label: Colour Adj
  kind: action
  params: []
- id: brightness_adj
  label: Brightness Adj
  kind: action
  params: []
- id: tint_adj
  label: Tint Adj
  kind: action
  params: []
- id: lensmem_rc1
  label: Lens Memory RC 1
  kind: action
  params: []
- id: lensmem_rc2
  label: Lens Memory RC 2
  kind: action
  params: []
- id: lensmem_rc3
  label: Lens Memory RC 3
  kind: action
  params: []
- id: testpattern_cycle
  label: Test Pattern Cycle
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "30": Standby
    - "31": Power On
    - "32": Cooling
    - "34": Emergency
- id: input_status
  label: Input Status
  type: enum
  values:
    - "30": S-Video
    - "31": Video
    - "32": Component
    - "33": PC
    - "36": HDMI 1
    - "37": HDMI 2
- id: gamma_table_status
  label: Gamma Table Status
  type: enum
  values:
    - "30": Normal
    - "31": A
    - "32": B
    - "33": C
    - "34": Custom 1
    - "35": Custom 2
    - "36": Custom 3
- id: gamma_value_status
  label: Gamma Value Status
  type: enum
  values:
    - "30": "1.8"
    - "31": "1.9"
    - "32": "2.0"
    - "33": "2.1"
    - "34": "2.2"
    - "35": "2.3"
    - "36": "2.4"
    - "37": "2.5"
    - "38": "2.6"
- id: source_status
  label: Source Status
  type: enum
  values:
    - "00": JVC Logo displayed
    - "30": No signal or signal out of range
    - "31": Signal input correctly
- id: model_status
  label: Model Status
  type: string
- id: ack_basic
  label: Basic Acknowledgement
  description: Returns 06 89 01 CC CC 0A where CC CC is first 2 bytes of command sent
- id: ack_detailed
  label: Detailed Acknowledgement
  description: Returns 40 89 01 followed by command bytes and RR status code
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented outside of action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# Power Off requires sending twice with short delay between commands
# LAN connection requires TCP handshake: PJ_OK -> PJREQ -> PJACK sequence
# Commands must be sent within 5 seconds of PJACK or connection closes
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Command format (RS-232C/LAN):**
- Header (1 byte): 21=Operating Command, 3F=Enquiry, 06=Ack Basic, 40=Ack Detailed
- Unit ID (2 bytes): fixed 89 01
- Command (2 bytes): function-specific
- Data (variable): value for command
- End (1 byte): fixed 0A

**RS-232C physical:** 9-pin D-Sub male. Rx=pin 2, Tx=pin 3, GND=pin 5.

**LAN control protocol (port 20554):**
1. Controller opens TCP connection to projector
2. Projector responds with "PJ_OK"
3. Controller responds with "PJREQ" within 5 seconds
4. Projector responds with "PJACK"
5. Controller sends command within 5 seconds
6. Projector closes connection after 5 seconds

**IR control:** Format is 73 followed by ASCII hex value of RC emulation command. Code A uses 73, Code B uses 63.

**Error handling:** Projector ignores unrecognized commands (bad Unit ID, parity error, invalid command). Ignores inappropriate commands (e.g., Power On when cooling). Discards commands if >50ms gap in data. External controller should wait for Ack before sending next command.

<!-- UNRESOLVED: DLA-SX21 not in source model list — spec based on general JVC projector RS-232C/LAN documentation -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - http://www.support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:43.669Z
last_checked_at: 2026-05-14T18:17:17.238Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.238Z
matched_actions: 159
action_count: 225
confidence: high
summary: "All actions, feedback values, and transport parameters verified against source RS-232C/LAN control guide. Spec correctly notes model not explicitly listed in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
