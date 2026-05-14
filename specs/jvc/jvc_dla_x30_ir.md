---
spec_id: admin/jvc-dla-x30
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DLA-X30 Control Spec"
manufacturer: JVC
model_family: DLA-X30
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-X30
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - snapav.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://support.jvc.com/consumer/support/documents/DILARemoteControlGuide.pdf
  - http://www.support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/ProjectionScreens/ProtocolsAndDrivers/LX-NZ3_External_Command_List.pdf
retrieved_at: 2026-04-30T04:26:48.085Z
last_checked_at: 2026-05-14T18:17:17.254Z
generated_at: 2026-05-14T18:17:17.254Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.254Z
  matched_actions: 109
  action_count: 174
  confidence: high
  summary: "All 109 spec actions matched literally in source with correct hex codes; transport parameters (19200 baud, port 20554, 8-N-1) verified verbatim; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# JVC DLA-X30 Control Spec

## Summary
JVC DLA-X30 home-theater D-ILA projector supporting RS-232C and TCP/IP (LAN) control. Protocol is JVC's proprietary binary hex format with a 3-way handshake on LAN (Port 20554) and standard RS-232C at 19200/8-N-1. Commands include power, input routing, picture modes, gamma, lens controls, 3D settings, and enquiry/feedback queries.

<!-- UNRESOLVED: no firmware version stated in source -->

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
  port: 20554  # LAN control port; RS-232C has no port
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
# Direct Commands
- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "21 89 01 50 57 30 0A"

- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "21 89 01 50 57 31 0A"

- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  params: []
  hex: "21 89 01 49 50 36 0A"

- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  params: []
  hex: "21 89 01 49 50 37 0A"

- id: input_component
  label: Input Component
  kind: action
  params: []
  hex: "21 89 01 49 50 32 0A"

- id: input_svideo
  label: Input S-Video
  kind: action
  params: []
  hex: "21 89 01 49 50 30 0A"

- id: input_video
  label: Input Video
  kind: action
  params: []
  hex: "21 89 01 49 50 31 0A"

- id: input_pc
  label: Input PC
  kind: action
  params: []
  hex: "21 89 01 49 50 33 0A"

- id: input_next
  label: Input + (Next Highest)
  kind: action
  params: []
  hex: "21 89 01 49 50 2B 0A"

- id: input_prev
  label: Input - (Next Lowest)
  kind: action
  params: []
  hex: "21 89 01 49 50 2D 0A"

- id: testpattern_off
  label: Test Pattern Off
  kind: action
  params: []
  hex: "21 89 01 54 53 30 0A"

- id: testpattern_colourbars
  label: Test Pattern Colour Bars
  kind: action
  params: []
  hex: "21 89 01 54 53 31 0A"

- id: testpattern_stairstep_bw
  label: Test Pattern Stairstep (B&W)
  kind: action
  params: []
  hex: "21 89 01 54 53 36 0A"

- id: testpattern_stairstep_red
  label: Test Pattern Stairstep (Red)
  kind: action
  params: []
  hex: "21 89 01 54 53 37 0A"

- id: testpattern_stairstep_green
  label: Test Pattern Stairstep (Green)
  kind: action
  params: []
  hex: "21 89 01 54 53 38 0A"

- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep (Blue)
  kind: action
  params: []
  hex: "21 89 01 54 53 39 0A"

- id: testpattern_crosshatch
  label: Test Pattern Crosshatch (Green)
  kind: action
  params: []
  hex: "21 89 01 54 53 41 0A"

- id: gamma_normal
  label: Gamma Normal
  kind: action
  params: []
  hex: "21 89 01 47 54 30 0A"

- id: gamma_a
  label: Gamma A
  kind: action
  params: []
  hex: "21 89 01 47 54 31 0A"

- id: gamma_b
  label: Gamma B
  kind: action
  params: []
  hex: "21 89 01 47 54 32 0A"

- id: gamma_c
  label: Gamma C
  kind: action
  params: []
  hex: "21 89 01 47 54 33 0A"

- id: gamma_d
  label: Gamma D
  kind: action
  params: []
  hex: "21 89 01 47 54 37 0A"

- id: gamma_custom1
  label: Gamma Custom 1
  kind: action
  params: []
  hex: "21 89 01 47 54 34 0A"

- id: gamma_custom2
  label: Gamma Custom 2
  kind: action
  params: []
  hex: "21 89 01 47 54 35 0A"

- id: gamma_custom3
  label: Gamma Custom 3
  kind: action
  params: []
  hex: "21 89 01 47 54 36 0A"

- id: gamma_value_18
  label: Gamma Correction Value 1.8
  kind: action
  params: []
  hex: "21 89 01 47 50 30 0A"

- id: gamma_value_19
  label: Gamma Correction Value 1.9
  kind: action
  params: []
  hex: "21 89 01 47 50 31 0A"

- id: gamma_value_20
  label: Gamma Correction Value 2.0
  kind: action
  params: []
  hex: "21 89 01 47 50 32 0A"

- id: gamma_value_21
  label: Gamma Correction Value 2.1
  kind: action
  params: []
  hex: "21 89 01 47 50 33 0A"

- id: gamma_value_22
  label: Gamma Correction Value 2.2 (Default)
  kind: action
  params: []
  hex: "21 89 01 47 50 34 0A"

- id: gamma_value_23
  label: Gamma Correction Value 2.3
  kind: action
  params: []
  hex: "21 89 01 47 50 35 0A"

- id: gamma_value_24
  label: Gamma Correction Value 2.4
  kind: action
  params: []
  hex: "21 89 01 47 50 36 0A"

- id: gamma_value_25
  label: Gamma Correction Value 2.5
  kind: action
  params: []
  hex: "21 89 01 47 50 37 0A"

- id: gamma_value_26
  label: Gamma Correction Value 2.6
  kind: action
  params: []
  hex: "21 89 01 47 50 38 0A"

- id: offtimer_off
  label: Off Timer Off
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 30 0A"

- id: offtimer_1hr
  label: Off Timer Set 1 Hour
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 31 0A"

- id: offtimer_2hr
  label: Off Timer Set 2 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 32 0A"

- id: offtimer_3hr
  label: Off Timer Set 3 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 33 0A"

- id: offtimer_4hr
  label: Off Timer Set 4 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 34 0A"

- id: lamppower_normal
  label: Lamp Power Normal
  kind: action
  params: []
  hex: "21 89 01 50 4D 4C 50 30 0A"

- id: lamppower_high
  label: Lamp Power High
  kind: action
  params: []
  hex: "21 89 01 50 4D 4C 50 31 0A"

- id: remotecode_a
  label: Infrared Remote Code A (hex 73)
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 30 0A"

- id: remotecode_b
  label: Infrared Remote Code B (hex 63)
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 31 0A"

- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 30 0A"

- id: trigger_power
  label: Trigger On (Power)
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 31 0A"

- id: trigger_anamorphic
  label: Trigger On (Anamorphic)
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 32 0A"

- id: clearmotion_off
  label: Clear Motion Drive Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 30 0A"

- id: clearmotion_mode1
  label: Clear Motion Drive Mode 1 (Low)
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 31 0A"

- id: clearmotion_mode2
  label: Clear Motion Drive Mode 2 (High)
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 32 0A"

- id: clearmotion_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 33 0A"

- id: clearmotion_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 34 0A"

- id: clearmotion_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 35 0A"

- id: anamorphic_off
  label: Anamorphic Off
  kind: action
  params: []
  hex: "21 89 01 49 4E 56 53 30 0A"

- id: anamorphic_a
  label: Anamorphic A
  kind: action
  params: []
  hex: "21 89 01 49 4E 56 53 31 0A"

- id: anamorphic_b
  label: Anamorphic B
  kind: action
  params: []
  hex: "21 89 01 49 4E 56 53 32 0A"

- id: picturemode_film
  label: Picture Mode Film
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 30 0A"

- id: picturemode_cinema
  label: Picture Mode Cinema
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 31 0A"

- id: picturemode_animation
  label: Picture Mode Animation
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 32 0A"

- id: picturemode_natural
  label: Picture Mode Natural
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 33 0A"

- id: picturemode_stage
  label: Picture Mode Stage
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 34 0A"

- id: picturemode_thx
  label: Picture Mode THX
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 36 0A"

- id: picturemode_3d
  label: Picture Mode 3D
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 42 0A"

- id: picturemode_user1
  label: Picture Mode User 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 43 0A"

- id: picturemode_user2
  label: Picture Mode User 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 44 0A"

- id: picturemode_user3
  label: Picture Mode User 3
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 45 0A"

- id: picturemode_user4
  label: Picture Mode User 4
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 46 0A"

- id: picturemode_user5
  label: Picture Mode User 5
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 31 30 0A"

- id: colourprofile_off
  label: Colour Profile Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 30 0A"

- id: colourprofile_film1
  label: Colour Profile Film 1 (Film mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 31 0A"

- id: colourprofile_film2
  label: Colour Profile Film 2 (Film mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 32 0A"

- id: colourprofile_standard
  label: Colour Profile Standard
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 33 0A"

- id: colourprofile_cinema1
  label: Colour Profile Cinema 1 (Cinema mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 34 0A"

- id: colourprofile_cinema2
  label: Colour Profile Cinema 2 (Cinema mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 35 0A"

- id: colourprofile_anime1
  label: Colour Profile Anime 1 (Animation mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 36 0A"

- id: colourprofile_anime2
  label: Colour Profile Anime 2 (Animation mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 37 0A"

- id: colourprofile_video
  label: Colour Profile Video (Natural mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 38 0A"

- id: colourprofile_vivid
  label: Colour Profile Vivid (Natural & 3D modes)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 39 0A"

- id: colourprofile_adobe
  label: Colour Profile Adobe (Natural mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 41 0A"

- id: colourprofile_stage
  label: Colour Profile Stage (Stage mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 42 0A"

- id: colourprofile_3d
  label: Colour Profile 3D (3D mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 43 0A"

- id: colourprofile_thx
  label: Colour Profile THX (THX mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 44 0A"

- id: format_3d_off
  label: 3D Format Off (2D)
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 30 0A"

- id: format_3d_auto
  label: 3D Format Auto
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 31 0A"

- id: format_3d_framepacking
  label: 3D Format Frame Packing
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 32 0A"

- id: format_3d_sidebyside
  label: 3D Format Side by Side
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 33 0A"

- id: format_3d_topbottom
  label: 3D Format Top and Bottom
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 34 0A"

- id: convert_2dto3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
  hex: "21 89 01 49 53 33 43 30 0A"

- id: convert_2dto3d_on
  label: 2D to 3D Conversion On
  kind: action
  params: []
  hex: "21 89 01 49 53 33 43 31 0A"

- id: subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  params: []
  hex: "21 89 01 49 53 33 54 31 0A"

- id: subtitle_correction_on
  label: 3D Subtitle Correction On
  kind: action
  params: []
  hex: "21 89 01 49 53 33 54 30 0A"

- id: lensmemory_save1
  label: Lens Memory Save Memory 1
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 30 0A"

- id: lensmemory_save2
  label: Lens Memory Save Memory 2
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 31 0A"

- id: lensmemory_save3
  label: Lens Memory Save Memory 3
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 32 0A"

- id: lensmemory_select1
  label: Lens Memory Select Memory 1
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 30 0A"

- id: lensmemory_select2
  label: Lens Memory Select Memory 2
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 31 0A"

- id: lensmemory_select3
  label: Lens Memory Select Memory 3
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 32 0A"

- id: null_command
  label: Null Command (communication check)
  kind: action
  params: []
  hex: "21 89 01 00 00 0A"

# Remote Control Emulation Commands (subset - see full table for X30-specific)
- id: power_off_rc
  label: Power Off (Remote Emulation - send twice)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 36 0A"

- id: power_on_rc
  label: Power On (Remote Emulation)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 35 0A"

- id: input_hdmi1_rc
  label: Input HDMI 1 (Remote Emulation)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 30 0A"

- id: input_hdmi2_rc
  label: Input HDMI 2 (Remote Emulation)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 31 0A"

- id: input_component_rc
  label: Input Component (Remote Emulation)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 34 0A"

- id: input_video_rc
  label: Input Video (Remote Emulation)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 42 0A"

- id: brightness_up
  label: Brightness +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 41 0A"

- id: brightness_down
  label: Brightness -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 42 0A"

- id: contrast_up
  label: Contrast +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 38 0A"

- id: contrast_down
  label: Contrast -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 39 0A"

- id: colour_up
  label: Colour +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 43 0A"

- id: colour_down
  label: Colour -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 44 0A"

- id: tint_up
  label: Tint +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 38 0A"

- id: tint_down
  label: Tint -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 39 0A"

- id: sharpness_up
  label: Sharpness +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 45 0A"

- id: sharpness_down
  label: Sharpness -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 46 0A"

- id: aspect_169
  label: Aspect 16:9
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 36 0A"

- id: aspect_43
  label: Aspect 4:3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 35 0A"

- id: aspect_zoom
  label: Aspect Zoom
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 37 0A"

- id: lensfocus_up
  label: Lens Focus +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 31 0A"

- id: lensfocus_down
  label: Lens Focus -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 32 0A"

- id: lenszoom_in
  label: Lens Zoom In
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 35 0A"

- id: lenszoom_out
  label: Lens Zoom Out
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 37 0A"

- id: lensshift_up
  label: Lens Shift Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 31 0A"

- id: lensshift_down
  label: Lens Shift Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 32 0A"

- id: lensshift_left
  label: Lens Shift Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 34 0A"

- id: lensshift_right
  label: Lens Shift Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 33 0A"

- id: lensaperture_up
  label: Lens Aperture +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 45 0A"

- id: lensaperture_down
  label: Lens Aperture -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 46 0A"

- id: menu_toggle
  label: Menu On/Off Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 45 0A"

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 31 0A"

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 32 0A"

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 36 0A"

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 34 0A"

- id: ok_accept
  label: OK (Accept Selection)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 46 0A"

- id: back_step
  label: Back (Steps Backwards Through Menus)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 33 0A"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 39 0A"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 41 0A"

- id: hide_toggle
  label: Hide On/Off Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 44 0A"

- id: information_display
  label: Information (Display Info Tab)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 34 0A"

- id: colourtemp_6500k
  label: Colour Temperature 6500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 46 0A"

- id: colortemp_custom1
  label: Colour Temperature Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 33 0A"

- id: colortemp_custom2
  label: Colour Temperature Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 34 0A"

- id: colortemp_custom3
  label: Colour Temperature Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 35 0A"

- id: colortemp_highbright
  label: Colour Temperature High Bright
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 32 0A"

- id: rnr_down
  label: RNR (Random Noise Reduction) -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 43 0A"

- id: rnr_up
  label: RNR (Random Noise Reduction) +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 42 0A"

- id: mnr_down
  label: MNR (Mosquito Noise Reduction) -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 45 0A"

- id: mnr_up
  label: MNR (Mosquito Noise Reduction) +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 44 0A"

- id: bnr_off
  label: BNR (Block Noise Reduction) Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 30 0A"

- id: bnr_on
  label: BNR (Block Noise Reduction) On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 46 0A"

- id: cec_off
  label: CEC Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 37 0A"

- id: cec_on
  label: CEC On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 36 0A"

- id: pixel_shift_h_blue_down
  label: Pixel Shift Horizontal Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 45 0A"

- id: pixel_shift_h_blue_up
  label: Pixel Shift Horizontal Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 44 0A"

- id: pixel_shift_h_green_down
  label: Pixel Shift Horizontal Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 43 0A"

- id: pixel_shift_h_green_up
  label: Pixel Shift Horizontal Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 42 0A"

- id: pixel_shift_h_red_down
  label: Pixel Shift Horizontal Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 41 0A"

- id: pixel_shift_h_red_up
  label: Pixel Shift Horizontal Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 39 0A"

- id: pixel_shift_v_blue_down
  label: Pixel Shift Vertical Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 34 0A"

- id: pixel_shift_v_blue_up
  label: Pixel Shift Vertical Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 33 0A"

- id: pixel_shift_v_green_down
  label: Pixel Shift Vertical Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 32 0A"

- id: pixel_shift_v_green_up
  label: Pixel Shift Vertical Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 31 0A"

- id: pixel_shift_v_red_down
  label: Pixel Shift Vertical Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 30 0A"

- id: pixel_shift_v_red_up
  label: Pixel Shift Vertical Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 46 0A"

- id: mask_bottom_down
  label: Mask Bottom -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 38 0A"

- id: mask_bottom_up
  label: Mask Bottom +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 37 0A"

- id: mask_left_down
  label: Mask Left -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 32 0A"

- id: mask_left_up
  label: Mask Left +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 31 0A"

- id: mask_right_down
  label: Mask Right -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 34 0A"

- id: mask_right_up
  label: Mask Right +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 33 0A"

- id: mask_top_down
  label: Mask Top -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 36 0A"

- id: mask_top_up
  label: Mask Top +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 35 0A"

- id: hposition_down
  label: Horizontal Position -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 42 0A"

- id: hposition_up
  label: Horizontal Position +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 41 0A"

- id: vposition_down
  label: Vertical Position -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 44 0A"

- id: vposition_up
  label: Vertical Position +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 43 0A"
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "30"  # Standby
    - "31"  # Power On
    - "32"  # Cooling
    - "34"  # Emergency
  enquiry_hex: "3F 89 01 50 57 0A"
  response_format: "06 89 01 50 57 0A 40 89 01 50 57 RR 0A"

- id: input_status
  label: Video Input Status
  type: enum
  values:
    - "30"  # S-Video
    - "31"  # Video
    - "32"  # Component
    - "33"  # PC
    - "36"  # HDMI 1
    - "37"  # HDMI 2
  enquiry_hex: "3F 89 01 49 50 0A"
  response_format: "06 89 01 49 50 0A 40 89 01 49 50 RR 0A"

- id: gamma_table_status
  label: Gamma Table Status
  type: enum
  values:
    - "30"  # Gamma Normal
    - "31"  # Gamma A
    - "32"  # Gamma B
    - "33"  # Gamma C
    - "34"  # Gamma Custom 1
    - "35"  # Gamma Custom 2
    - "36"  # Gamma Custom 3
  enquiry_hex: "3F 89 01 47 54 0A"
  response_format: "06 89 01 47 54 0A 40 89 01 47 54 RR 0A"

- id: gamma_value_status
  label: Gamma Value Status
  type: enum
  values:
    - "30"  # 1.8
    - "31"  # 1.9
    - "32"  # 2.0
    - "33"  # 2.1
    - "34"  # 2.2
    - "35"  # 2.3
    - "36"  # 2.4
    - "37"  # 2.5
    - "38"  # 2.6
  enquiry_hex: "3F 89 01 47 50 0A"
  response_format: "06 89 01 47 50 0A 40 89 01 47 50 RR 0A"

- id: source_status
  label: Video Source Status
  type: enum
  values:
    - "00"  # JVC Logo displayed
    - "30"  # No signal or signal out of range
    - "31"  # Signal input correctly
  enquiry_hex: "3F 89 01 53 43 0A"
  response_format: "06 89 01 53 43 0A 40 89 01 53 43 RR 0A"

- id: model_status
  label: Projector Model
  type: enum
  values:
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 34"  # DLA-HD350
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 37"  # DLA-RS10
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 35"  # DLA-HD750 & DLA-RS20
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 38"  # DLA-HD550
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 39"  # DLA-RS15
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 42"  # DLA-HD950/HD990/DLA-RS25/RS35
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 42"  # DLA-X3 & DLA-RS40
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 43"  # DLA-X7/X9 & DLA-RS50/60
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 45"  # DLA-X30 & DLA-RS45
    - "494C41 46 50 4A 20 2D 2D 20 2D 58 48 46"  # DLA-X70R/X90R & DLA-RS55/65
  enquiry_hex: "3F 89 01 4D 44 0A"
  response_format: "06 89 01 4D 44 0A 40 89 01 4D 44 RR 0A"

- id: basic_ack
  label: Basic Acknowledgement (all commands)
  type: enum
  values:
    - "06 89 01 [command bytes] 0A"  # Success
  note: "Returned for all successful commands; format varies by command type"
```

## Variables
```yaml
# All direct and remote emulation commands that set a parameter value are
# effectively settable variables. Key groups:
- id: input_selected
  type: enum
  values: [hdmi1, hdmi2, component, svideo, video, pc]

- id: gamma_table
  type: enum
  values: [normal, a, b, c, d, custom1, custom2, custom3]

- id: gamma_value
  type: enum
  values: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6]

- id: picture_mode
  type: enum
  values: [film, cinema, animation, natural, stage, thx, user1, user2, user3, user4, user5, dynamic, cinema1, cinema2, cinema3]

- id: colour_profile
  type: enum
  values: [off, film1, film2, standard, cinema1, cinema2, anime1, anime2, video, vivid, adobe, stage, three_d, thx]

- id: aspect_ratio
  type: enum
  values: [16:9, 4:3, zoom, auto, full, just]

- id: clear_motion_drive
  type: enum
  values: [off, mode1, mode2, mode3, mode4, inverse_telecine]

- id: anamorphic_mode
  type: enum
  values: [off, a, b]

- id: format_3d
  type: enum
  values: [off2d, auto, frame_packing, side_by_side, top_bottom]

- id: lamp_power
  type: enum
  values: [normal, high]

- id: offtimer
  type: enum
  values: [off, 1hr, 2hr, 3hr, 4hr]

- id: trigger_output
  type: enum
  values: [off, power, anamorphic]

- id: colour_temperature
  type: enum
  values: [5800k, 6500k, 7500k, 9300k, custom1, custom2, custom3, high_bright]
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications.
# Projector does send acknowledgement responses to commands, but does not
# initiate communication on its own (polling required).
```

## Macros
```yaml
# The source explicitly documents this pattern:
- id: power_off_with_confirm
  label: Power Off (send twice with short delay)
  description: |
    Send power_off command twice with a short delay between transmissions
    to ensure the projector powers off. Single transmission may be ignored.
  steps:
    - send: power_off
    - delay: 500ms  # inferred; source says "short delay"
    - send: power_off
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Note: Power Off requires sending the command twice with short delay.
# Projector ignores commands during cooling state.
```

## Notes

**Command format structure:**
- Header (1 byte): `21` = Operating Command, `3F` = Enquiry, `06` = Basic ACK, `40` = Detailed ACK
- Unit ID (2 bytes): always `89 01`
- Command (2 bytes): function-specific
- Data (variable): parameter value
- End (1 byte): always `0A`

**LAN handshake sequence:**
1. Controller → Projector: TCP connect to port 20554
2. Projector → Controller: `PJ_OK`
3. Controller → Projector: `PJREQ` (within 5s)
4. Projector → Controller: `PJACK` (within 5s)
5. Controller → Projector: hex command (within 5s)
6. Connection closes after ~5s of inactivity

**Error handling:** Projector discards commands after 50ms gap in incoming data. Ignores commands with mismatched Unit ID, parity error, invalid command, or inappropriate state (e.g., Power On while cooling).

**Infrared control:** Separate IR protocol — hex code `73` (Code A) or `63` (Code B) followed by ASCII command value. Code B selectable via projector menu or remote button combo.

**RS-232C cable:** Cross-connected/null modem (DTE/DTE) cable required.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: LAN IP address configuration defaults stated but DHCP optional; static IP default 192.168.0.2 -->
<!-- UNRESOLVED: no unsolicited event notifications described in source — polling required for all state -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - snapav.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://support.jvc.com/consumer/support/documents/DILARemoteControlGuide.pdf
  - http://www.support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/ProjectionScreens/ProtocolsAndDrivers/LX-NZ3_External_Command_List.pdf
retrieved_at: 2026-04-30T04:26:48.085Z
last_checked_at: 2026-05-14T18:17:17.254Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.254Z
matched_actions: 109
action_count: 174
confidence: high
summary: "All 109 spec actions matched literally in source with correct hex codes; transport parameters (19200 baud, port 20554, 8-N-1) verified verbatim; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
