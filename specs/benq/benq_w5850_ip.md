---
spec_id: admin/benq-w5850
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ W5850 Control Spec"
manufacturer: BenQ
model_family: W5850
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - W5850
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W5850/W5850_RS232%20Control%20Guide_1.01_Windows_250314093002.pdf"
retrieved_at: 2026-07-24T18:42:01.883Z
last_checked_at: 2026-08-05T08:12:44.269Z
generated_at: 2026-08-05T08:12:44.269Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range, HDBaseT-extender LAN behavior (only LAN cable described), exact list of features actually supported on W5850 vs. broader catalogue (column \"Support: Yes\" used as ground truth in Actions)."
  - "range not stated in source"
  - "source does not document any unsolicited notifications. The doc"
  - "source does not describe any multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "numeric value ranges (volume, contrast, brightness, color, sharpness, fleshtone, lamp custom, keystone) not stated in source. Error-recovery behavior beyond three documented echo strings not described. Firmware version dependencies not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:12:44.269Z
  matched_actions: 342
  action_count: 342
  confidence: medium
  summary: "All 342 spec action units are present in source command table; transport values verbatim; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# BenQ W5850 Control Spec

## Summary
BenQ W5850 home-cinema projector. RS-232 (DB-9 D-Sub) control plus RS-232-over-LAN (TCP port 8000). Commands are ASCII wrapped in `<CR>...<CR>`, identical framing on both transports.

<!-- UNRESOLVED: firmware version range, HDBaseT-extender LAN behavior (only LAN cable described), exact list of features actually supported on W5850 vs. broader catalogue (column "Support: Yes" used as ground truth in Actions). -->

## Transport
```yaml
# Both serial (DB-9) and TCP (RS-232-over-LAN) listed - source explicitly documents
# RS-232 cable and "RS232 via LAN" with TCP port 8000. No HDBaseT-over-IP framing
# details beyond physical connection.
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # RS-232 over LAN TCP port, from source "Input 8000 in the TCP port # field"
serial:
  baud_rate: 9600  # source lists 9600/14400/19200/38400/57600/115200; 9600 is one of supported rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable: true   # *pow=on / *pow=off
routable: true    # *sour=* source select
queryable: true   # many `=?` read commands
levelable: true   # volume, brightness, contrast, color, sharpness, keystone
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  command: "<CR>*pow=on#<CR>"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "<CR>*pow=off#<CR>"
  params: []
- id: power_status
  label: Power Status
  kind: query
  command: "<CR>*pow=?#<CR>"
  params: []

# Source Selection
- id: source_hdmi1
  label: Source HDMI 1 (MHL)
  kind: action
  command: "<CR>*sour=hdmi#<CR>"
  params: []
- id: source_hdmi2
  label: Source HDMI 2 (MHL2)
  kind: action
  command: "<CR>*sour=hdmi2#<CR>"
  params: []
- id: source_usbreader
  label: Source USB Reader
  kind: action
  command: "<CR>*sour=usbreader#<CR>"
  params: []
- id: source_rgb
  label: Source COMPUTER/YPbPr
  kind: action
  command: "<CR>*sour=RGB#<CR>"
  params: []
- id: source_rgb2
  label: Source COMPUTER 2/YPbPr2
  kind: action
  command: "<CR>*sour=RGB2#<CR>"
  params: []
- id: source_rgb3
  label: Source COMPUTER 3/YPbPr3
  kind: action
  command: "<CR>*sour=RGB3#<CR>"
  params: []
- id: source_ypbr
  label: Source Component
  kind: action
  command: "<CR>*sour=ypbr#<CR>"
  params: []
- id: source_ypbr2
  label: Source Component2
  kind: action
  command: "<CR>*sour=ypbr2#<CR>"
  params: []
- id: source_dviA
  label: Source DVI-A
  kind: action
  command: "<CR>*sour=dviA#<CR>"
  params: []
- id: source_dvid
  label: Source DVI-D
  kind: action
  command: "<CR>*sour=dvid#<CR>"
  params: []
- id: source_hdmi3
  label: Source HDMI 3 (ATV)
  kind: action
  command: "<CR>*sour=hdmi3#<CR>"
  params: []
- id: source_vid
  label: Source Composite
  kind: action
  command: "<CR>*sour=vid#<CR>"
  params: []
- id: source_svid
  label: Source S-Video
  kind: action
  command: "<CR>*sour=svid#<CR>"
  params: []
- id: source_network
  label: Source Network
  kind: action
  command: "<CR>*sour=network#<CR>"
  params: []
- id: source_usbdisplay
  label: Source USB Display
  kind: action
  command: "<CR>*sour=usbdisplay#<CR>"
  params: []
- id: source_hdbaset
  label: Source HDBaseT
  kind: action
  command: "<CR>*sour=hdbaset#<CR>"
  params: []
- id: source_dp
  label: Source DisplayPort
  kind: action
  command: "<CR>*sour=dp#<CR>"
  params: []
- id: source_sdi
  label: Source 3G-SDI
  kind: action
  command: "<CR>*sour=sdi#<CR>"
  params: []
- id: source_smartsystem
  label: Source Smart System
  kind: action
  command: "<CR>*sour=smartsystem#<CR>"
  params: []
- id: source_current
  label: Current Source
  kind: query
  command: "<CR>*sour=?#<CR>"
  params: []

# Audio Control
- id: mute_on
  label: Mute On
  kind: action
  command: "<CR>*mute=on#<CR>"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "<CR>*mute=off#<CR>"
  params: []
- id: mute_status
  label: Mute Status
  kind: query
  command: "<CR>*mute=?#<CR>"
  params: []
- id: volume_up
  label: Volume +
  kind: action
  command: "<CR>*vol=+#<CR>"
  params: []
- id: volume_down
  label: Volume -
  kind: action
  command: "<CR>*vol=-#<CR>"
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  command: "<CR>*vol={level}#<CR>"
  params:
    - name: level
      type: integer
      description: Volume value (range UNRESOLVED in source)
- id: volume_status
  label: Volume Status
  kind: query
  command: "<CR>*vol=?#<CR>"
  params: []
- id: mic_volume_up
  label: Mic Volume +
  kind: action
  command: "<CR>*micvol=+#<CR>"
  params: []
- id: mic_volume_down
  label: Mic Volume -
  kind: action
  command: "<CR>*micvol=-#<CR>"
  params: []
- id: mic_volume_status
  label: Mic Volume Status
  kind: query
  command: "<CR>*micvol=?#<CR>"
  params: []

# Audio Source Select
- id: audio_pass_off
  label: Audio Pass Through Off
  kind: action
  command: "<CR>*audiosour=off#<CR>"
  params: []
- id: audio_rgb
  label: Audio Computer1
  kind: action
  command: "<CR>*audiosour=RGB#<CR>"
  params: []
- id: audio_rgb2
  label: Audio Computer2
  kind: action
  command: "<CR>*audiosour=RGB2#<CR>"
  params: []
- id: audio_vid
  label: Audio Video/S-Video
  kind: action
  command: "<CR>*audiosour=vid#<CR>"
  params: []
- id: audio_ypbr
  label: Audio Component
  kind: action
  command: "<CR>*audiosour=ypbr#<CR>"
  params: []
- id: audio_hdmi
  label: Audio HDMI
  kind: action
  command: "<CR>*audiosour=hdmi#<CR>"
  params: []
- id: audio_hdmi2
  label: Audio HDMI2
  kind: action
  command: "<CR>*audiosour=hdmi2#<CR>"
  params: []
- id: audio_hdmi3
  label: Audio HDMI3
  kind: action
  command: "<CR>*audiosour=hdmi3#<CR>"
  params: []
- id: audio_pass_status
  label: Audio Pass Status
  kind: query
  command: "<CR>*audiosour=?#<CR>"
  params: []

# Picture Mode
- id: appmod_dynamic
  label: Picture Mode Dynamic
  kind: action
  command: "<CR>*appmod=dynamic#<CR>"
  params: []
- id: appmod_preset
  label: Picture Mode Presentation
  kind: action
  command: "<CR>*appmod=preset#<CR>"
  params: []
- id: appmod_srgb
  label: Picture Mode sRGB
  kind: action
  command: "<CR>*appmod=srgb#<CR>"
  params: []
- id: appmod_bright
  label: Picture Mode Bright
  kind: action
  command: "<CR>*appmod=bright#<CR>"
  params: []
- id: appmod_brightcine
  label: Picture Mode Bright Cinema
  kind: action
  command: "<CR>*appmod=brightcine#<CR>"
  params: []
- id: appmod_filmmaker
  label: Picture Mode FILMMAKER MODE
  kind: action
  command: "<CR>*appmod=filmmaker#<CR>"
  params: []
- id: appmod_livingroom
  label: Picture Mode Living Room
  kind: action
  command: "<CR>*appmod=livingroom#<CR>"
  params: []
- id: appmod_game
  label: Picture Mode Game
  kind: action
  command: "<CR>*appmod=game#<CR>"
  params: []
- id: appmod_cine
  label: Picture Mode Cinema (Rec.709)
  kind: action
  command: "<CR>*appmod=cine#<CR>"
  params: []
- id: appmod_std
  label: Picture Mode Standard/Vivid
  kind: action
  command: "<CR>*appmod=std#<CR>"
  params: []
- id: appmod_football
  label: Picture Mode Football
  kind: action
  command: "<CR>*appmod=football#<CR>"
  params: []
- id: appmod_footballbt
  label: Picture Mode Football Bright
  kind: action
  command: "<CR>*appmod=footballbt#<CR>"
  params: []
- id: appmod_dicom
  label: Picture Mode DICOM
  kind: action
  command: "<CR>*appmod=dicom#<CR>"
  params: []
- id: appmod_thx
  label: Picture Mode THX
  kind: action
  command: "<CR>*appmod=thx#<CR>"
  params: []
- id: appmod_silence
  label: Picture Mode Silence
  kind: action
  command: "<CR>*appmod=silence#<CR>"
  params: []
- id: appmod_dci_p3
  label: Picture Mode DCI-P3 (D. Cinema)
  kind: action
  command: "<CR>*appmod=dci-p3#<CR>"
  params: []
- id: appmod_vivid
  label: Picture Mode Vivid
  kind: action
  command: "<CR>*appmod=vivid#<CR>"
  params: []
- id: appmod_infographic
  label: Picture Mode Infographic
  kind: action
  command: "<CR>*appmod=infographic#<CR>"
  params: []
- id: appmod_user1
  label: Picture Mode User1
  kind: action
  command: "<CR>*appmod=user1#<CR>"
  params: []
- id: appmod_user2
  label: Picture Mode User2
  kind: action
  command: "<CR>*appmod=user2#<CR>"
  params: []
- id: appmod_user3
  label: Picture Mode User3
  kind: action
  command: "<CR>*appmod=user3#<CR>"
  params: []
- id: appmod_isfday
  label: Picture Mode ISF Day
  kind: action
  command: "<CR>*appmod=isfday#<CR>"
  params: []
- id: appmod_isfnight
  label: Picture Mode ISF Night
  kind: action
  command: "<CR>*appmod=isfnight#<CR>"
  params: []
- id: appmod_3d
  label: Picture Mode 3D
  kind: action
  command: "<CR>*appmod=threed#<CR>"
  params: []
- id: appmod_sport
  label: Picture Mode Sport
  kind: action
  command: "<CR>*appmod=sport#<CR>"
  params: []
- id: appmod_hdr
  label: Picture Mode HDR10
  kind: action
  command: "<CR>*appmod=hdr#<CR>"
  params: []
- id: appmod_hlg
  label: Picture Mode HLG
  kind: action
  command: "<CR>*appmod=hlg#<CR>"
  params: []
- id: appmod_status
  label: Picture Mode Status
  kind: query
  command: "<CR>*appmod=?#<CR>"
  params: []

# Picture Setting - Contrast
- id: contrast_up
  label: Contrast +
  kind: action
  command: "<CR>*con=+#<CR>"
  params: []
- id: contrast_down
  label: Contrast -
  kind: action
  command: "<CR>*con=-#<CR>"
  params: []
- id: contrast_set
  label: Set Contrast
  kind: action
  command: "<CR>*con={value}#<CR>"
  params:
    - name: value
      type: integer
      description: Contrast value (range UNRESOLVED in source)
- id: contrast_status
  label: Contrast Status
  kind: query
  command: "<CR>*con=?#<CR>"
  params: []

# Picture Setting - Brightness
- id: brightness_up
  label: Brightness +
  kind: action
  command: "<CR>*bri=+#<CR>"
  params: []
- id: brightness_down
  label: Brightness -
  kind: action
  command: "<CR>*bri=-#<CR>"
  params: []
- id: brightness_set
  label: Set Brightness
  kind: action
  command: "<CR>*bri={value}#<CR>"
  params:
    - name: value
      type: integer
      description: Brightness value (range UNRESOLVED in source)
- id: brightness_status
  label: Brightness Status
  kind: query
  command: "<CR>*bri=?#<CR>"
  params: []

# Picture Setting - Color
- id: color_up
  label: Color +
  kind: action
  command: "<CR>*color=+#<CR>"
  params: []
- id: color_down
  label: Color -
  kind: action
  command: "<CR>*color=-#<CR>"
  params: []
- id: color_set
  label: Set Color
  kind: action
  command: "<CR>*color={value}#<CR>"
  params:
    - name: value
      type: integer
      description: Color value (range UNRESOLVED in source)
- id: color_status
  label: Color Status
  kind: query
  command: "<CR>*color=?#<CR>"
  params: []

# Picture Setting - Sharpness
- id: sharpness_up
  label: Sharpness +
  kind: action
  command: "<CR>*sharp=+#<CR>"
  params: []
- id: sharpness_down
  label: Sharpness -
  kind: action
  command: "<CR>*sharp=-#<CR>"
  params: []
- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "<CR>*sharp={value}#<CR>"
  params:
    - name: value
      type: integer
      description: Sharpness value (range UNRESOLVED in source)
- id: sharpness_status
  label: Sharpness Status
  kind: query
  command: "<CR>*sharp=?#<CR>"
  params: []

# Picture Setting - Flesh Tone
- id: fleshtone_up
  label: Flesh Tone +
  kind: action
  command: "<CR>*fleshtone=+#<CR>"
  params: []
- id: fleshtone_down
  label: Flesh Tone -
  kind: action
  command: "<CR>*fleshtone=-#<CR>"
  params: []
- id: fleshtone_set
  label: Set Flesh Tone
  kind: action
  command: "<CR>*fleshtone={value}#<CR>"
  params:
    - name: value
      type: integer
      description: Flesh Tone value (range UNRESOLVED in source)
- id: fleshtone_status
  label: Flesh Tone Status
  kind: query
  command: "<CR>*fleshtone=?#<CR>"
  params: []

# Picture Setting - Color Temperature
- id: ct_warmer
  label: Color Temperature Warmer
  kind: action
  command: "<CR>*ct=warmer#<CR>"
  params: []
- id: ct_warm
  label: Color Temperature Warm
  kind: action
  command: "<CR>*ct=warm#<CR>"
  params: []
- id: ct_normal
  label: Color Temperature Normal
  kind: action
  command: "<CR>*ct=normal#<CR>"
  params: []
- id: ct_cool
  label: Color Temperature Cool
  kind: action
  command: "<CR>*ct=cool#<CR>"
  params: []
- id: ct_cooler
  label: Color Temperature Cooler
  kind: action
  command: "<CR>*ct=cooler#<CR>"
  params: []
- id: ct_native
  label: Color Temperature Lamp Native
  kind: action
  command: "<CR>*ct=native#<CR>"
  params: []
- id: ct_status
  label: Color Temperature Status
  kind: query
  command: "<CR>*ct=?#<CR>"
  params: []

# Picture Setting - Aspect
- id: asp_4_3
  label: Aspect 4:3
  kind: action
  command: "<CR>*asp=4:3#<CR>"
  params: []
- id: asp_16_6
  label: Aspect 16:6
  kind: action
  command: "<CR>*asp=16:6#<CR>"
  params: []
- id: asp_16_9
  label: Aspect 16:9
  kind: action
  command: "<CR>*asp=16:9#<CR>"
  params: []
- id: asp_16_10
  label: Aspect 16:10
  kind: action
  command: "<CR>*asp=16:10#<CR>"
  params: []
- id: asp_2_35
  label: Aspect 2.35:1
  kind: action
  command: "<CR>*asp=2.35#<CR>"
  params: []
- id: asp_auto
  label: Aspect Auto
  kind: action
  command: "<CR>*asp=AUTO#<CR>"
  params: []
- id: asp_real
  label: Aspect Real
  kind: action
  command: "<CR>*asp=REAL#<CR>"
  params: []
- id: asp_lbox
  label: Aspect Letterbox
  kind: action
  command: "<CR>*asp=LBOX#<CR>"
  params: []
- id: asp_wide
  label: Aspect Wide
  kind: action
  command: "<CR>*asp=WIDE#<CR>"
  params: []
- id: asp_anam
  label: Aspect Anamorphic
  kind: action
  command: "<CR>*asp=ANAM#<CR>"
  params: []
- id: asp_anam_2_35
  label: Aspect Anamorphic 2.35
  kind: action
  command: "<CR>*asp=ANAM2.35#<CR>"
  params: []
- id: asp_anam_16_9
  label: Aspect Anamorphic 16:9
  kind: action
  command: "<CR>*asp=ANAM16:9#<CR>"
  params: []
- id: asp_status
  label: Aspect Status
  kind: query
  command: "<CR>*asp=?#<CR>"
  params: []

# Picture Setting - Keystone
- id: vkeystone_up
  label: Vertical Keystone +
  kind: action
  command: "<CR>*vkeystone=+#<CR>"
  params: []
- id: vkeystone_down
  label: Vertical Keystone -
  kind: action
  command: "<CR>*vkeystone=-#<CR>"
  params: []
- id: vkeystone_status
  label: Vertical Keystone Status
  kind: query
  command: "<CR>*vkeystone=?#<CR>"
  params: []
- id: hkeystone_up
  label: Horizontal Keystone +
  kind: action
  command: "<CR>*hkeystone=+#<CR>"
  params: []
- id: hkeystone_down
  label: Horizontal Keystone -
  kind: action
  command: "<CR>*hkeystone=-#<CR>"
  params: []
- id: hkeystone_status
  label: Horizontal Keystone Status
  kind: query
  command: "<CR>*hkeystone=?#<CR>"
  params: []

# Picture Setting - Overscan
- id: overscan_up
  label: Overscan +
  kind: action
  command: "<CR>*overscan=+#<CR>"
  params: []
- id: overscan_down
  label: Overscan -
  kind: action
  command: "<CR>*overscan=-#<CR>"
  params: []
- id: overscan_status
  label: Overscan Status
  kind: query
  command: "<CR>*overscan=?#<CR>"
  params: []

# Picture Setting - 4 Corners (TLX)
- id: cornerfittlx_down
  label: 4 Corners Top-Left-X Decrease
  kind: action
  command: "<CR>*cornerfittlx=-#<CR>"
  params: []
- id: cornerfittlx_up
  label: 4 Corners Top-Left-X Increase
  kind: action
  command: "<CR>*cornerfittlx=+#<CR>"
  params: []
- id: cornerfittlx_status
  label: 4 Corners Top-Left-X Status
  kind: query
  command: "<CR>*cornerfittlx=?#<CR>"
  params: []

# Picture Setting - 4 Corners (TLY)
- id: cornerfittly_down
  label: 4 Corners Top-Left-Y Decrease
  kind: action
  command: "<CR>*cornerfittly=-#<CR>"
  params: []
- id: cornerfittly_up
  label: 4 Corners Top-Left-Y Increase
  kind: action
  command: "<CR>*cornerfittly=+#<CR>"
  params: []
- id: cornerfittly_status
  label: 4 Corners Top-Left-Y Status
  kind: query
  command: "<CR>*cornerfittly=?#<CR>"
  params: []

# Picture Setting - 4 Corners (TRX)
- id: cornerfittrx_down
  label: 4 Corners Top-Right-X Decrease
  kind: action
  command: "<CR>*cornerfittrx=-#<CR>"
  params: []
- id: cornerfittrx_up
  label: 4 Corners Top-Right-X Increase
  kind: action
  command: "<CR>*cornerfittrx=+#<CR>"
  params: []
- id: cornerfittrx_status
  label: 4 Corners Top-Right-X Status
  kind: query
  command: "<CR>*cornerfittrx=?#<CR>"
  params: []

# Picture Setting - 4 Corners (TRY)
- id: cornerfittry_down
  label: 4 Corners Top-Right-Y Decrease
  kind: action
  command: "<CR>*cornerfittry=-#<CR>"
  params: []
- id: cornerfittry_up
  label: 4 Corners Top-Right-Y Increase
  kind: action
  command: "<CR>*cornerfittry=+#<CR>"
  params: []
- id: cornerfittry_status
  label: 4 Corners Top-Right-Y Status
  kind: query
  command: "<CR>*cornerfittry=?#<CR>"
  params: []

# Picture Setting - 4 Corners (BLX)
- id: cornerfitblx_down
  label: 4 Corners Bottom-Left-X Decrease
  kind: action
  command: "<CR>*cornerfitblx=-#<CR>"
  params: []
- id: cornerfitblx_up
  label: 4 Corners Bottom-Left-X Increase
  kind: action
  command: "<CR>*cornerfitblx=+#<CR>"
  params: []
- id: cornerfitblx_status
  label: 4 Corners Bottom-Left-X Status
  kind: query
  command: "<CR>*cornerfitblx=?#<CR>"
  params: []

# Picture Setting - 4 Corners (BLY)
- id: cornerfitbly_down
  label: 4 Corners Bottom-Left-Y Decrease
  kind: action
  command: "<CR>*cornerfitbly=-#<CR>"
  params: []
- id: cornerfitbly_up
  label: 4 Corners Bottom-Left-Y Increase
  kind: action
  command: "<CR>*cornerfitbly=+#<CR>"
  params: []
- id: cornerfitbly_status
  label: 4 Corners Bottom-Left-Y Status
  kind: query
  command: "<CR>*cornerfitbly=?#<CR>"
  params: []

# Picture Setting - 4 Corners (BRX)
- id: cornerfitbrx_down
  label: 4 Corners Bottom-Right-X Decrease
  kind: action
  command: "<CR>*cornerfitbrx=-#<CR>"
  params: []
- id: cornerfitbrx_up
  label: 4 Corners Bottom-Right-X Increase
  kind: action
  command: "<CR>*cornerfitbrx=+#<CR>"
  params: []
- id: cornerfitbrx_status
  label: 4 Corners Bottom-Right-X Status
  kind: query
  command: "<CR>*cornerfitbrx=?#<CR>"
  params: []

# Picture Setting - 4 Corners (BRY)
- id: cornerfitbry_down
  label: 4 Corners Bottom-Right-Y Decrease
  kind: action
  command: "<CR>*cornerfitbry=-#<CR>"
  params: []
- id: cornerfitbry_up
  label: 4 Corners Bottom-Right-Y Increase
  kind: action
  command: "<CR>*cornerfitbry=+#<CR>"
  params: []
- id: cornerfitbry_status
  label: 4 Corners Bottom-Right-Y Status
  kind: query
  command: "<CR>*cornerfitbry=?#<CR>"
  params: []

# Picture Setting - Digital Zoom
- id: zoom_in
  label: Digital Zoom In
  kind: action
  command: "<CR>*zoomI#<CR>"
  params: []
- id: zoom_out
  label: Digital Zoom Out
  kind: action
  command: "<CR>*zoomO#<CR>"
  params: []
- id: auto
  label: Auto
  kind: action
  command: "<CR>*auto#<CR>"
  params: []

# Picture Setting - Brilliant Color
- id: bc_on
  label: Brilliant Color On
  kind: action
  command: "<CR>*BC=on#<CR>"
  params: []
- id: bc_off
  label: Brilliant Color Off
  kind: action
  command: "<CR>*BC=off#<CR>"
  params: []
- id: bc_status
  label: Brilliant Color Status
  kind: query
  command: "<CR>*BC=?#<CR>"
  params: []

# Picture Setting - HDR
- id: hdr_auto
  label: HDR Auto
  kind: action
  command: "<CR>*hdr=auto#<CR>"
  params: []
- id: hdr_sdr
  label: HDR SDR
  kind: action
  command: "<CR>*hdr=sdr#<CR>"
  params: []
- id: hdr_hdr10
  label: HDR HDR10
  kind: action
  command: "<CR>*hdr=hdr#<CR>"
  params: []
- id: hdr_hlg
  label: HDR HLG
  kind: action
  command: "<CR>*hdr=hlg#<CR>"
  params: []
- id: hdr_status
  label: HDR Status
  kind: query
  command: "<CR>*hdr=?#<CR>"
  params: []

# Picture Setting - Reset
- id: rstcurpicsetting
  label: Reset Current Picture Settings
  kind: action
  command: "<CR>*rstcurpicsetting#<CR>"
  params: []
- id: rstallpicsetting
  label: Reset All Picture Settings
  kind: action
  command: "<CR>*rstallpicsetting#<CR>"
  params: []

# Projector Position
- id: pp_ft
  label: Projector Position Front Table
  kind: action
  command: "<CR>*pp=FT#<CR>"
  params: []
- id: pp_re
  label: Projector Position Rear Table
  kind: action
  command: "<CR>*pp=RE#<CR>"
  params: []
- id: pp_rc
  label: Projector Position Rear Ceiling
  kind: action
  command: "<CR>*pp=RC#<CR>"
  params: []
- id: pp_fc
  label: Projector Position Front Ceiling
  kind: action
  command: "<CR>*pp=FC#<CR>"
  params: []
- id: pp_status
  label: Projector Position Status
  kind: query
  command: "<CR>*pp=?#<CR>"
  params: []

# Quick Cooling
- id: qcool_on
  label: Quick Cooling On
  kind: action
  command: "<CR>*qcool=on#<CR>"
  params: []
- id: qcool_off
  label: Quick Cooling Off
  kind: action
  command: "<CR>*qcool=off#<CR>"
  params: []
- id: qcool_status
  label: Quick Cooling Status
  kind: query
  command: "<CR>*qcool=?#<CR>"
  params: []

# Operation Settings - Quick Auto Search
- id: qas_on
  label: Quick Auto Search On
  kind: action
  command: "<CR>*QAS=on#<CR>"
  params: []
- id: qas_off
  label: Quick Auto Search Off
  kind: action
  command: "<CR>*QAS=off#<CR>"
  params: []
- id: qas_status
  label: Quick Auto Search Status
  kind: query
  command: "<CR>*QAS=?#<CR>"
  params: []

# Operation Settings - Menu Position
- id: menuposition_center
  label: Menu Position Center
  kind: action
  command: "<CR>*menuposition=center#<CR>"
  params: []
- id: menuposition_tl
  label: Menu Position Top-Left
  kind: action
  command: "<CR>*menuposition=tl#<CR>"
  params: []
- id: menuposition_tr
  label: Menu Position Top-Right
  kind: action
  command: "<CR>*menuposition=tr#<CR>"
  params: []
- id: menuposition_br
  label: Menu Position Bottom-Right
  kind: action
  command: "<CR>*menuposition=br#<CR>"
  params: []
- id: menuposition_bl
  label: Menu Position Bottom-Left
  kind: action
  command: "<CR>*menuposition=bl#<CR>"
  params: []
- id: menuposition_status
  label: Menu Position Status
  kind: query
  command: "<CR>*menuposition=?#<CR>"
  params: []

# Operation Settings - Direct Power On
- id: directpower_on
  label: Direct Power On
  kind: action
  command: "<CR>*directpower=on#<CR>"
  params: []
- id: directpower_off
  label: Direct Power Off
  kind: action
  command: "<CR>*directpower=off#<CR>"
  params: []
- id: directpower_status
  label: Direct Power On Status
  kind: query
  command: "<CR>*directpower=?#<CR>"
  params: []

# Operation Settings - Signal Power On
- id: autopower_on
  label: Signal Power On
  kind: action
  command: "<CR>*autopower=on#<CR>"
  params: []
- id: autopower_off
  label: Signal Power Off
  kind: action
  command: "<CR>*autopower=off#<CR>"
  params: []
- id: autopower_status
  label: Signal Power On Status
  kind: query
  command: "<CR>*autopower=?#<CR>"
  params: []

# Operation Settings - Standby Network
- id: standbynet_on
  label: Standby Network On
  kind: action
  command: "<CR>*standbynet=on#<CR>"
  params: []
- id: standbynet_off
  label: Standby Network Off
  kind: action
  command: "<CR>*standbynet=off#<CR>"
  params: []
- id: standbynet_status
  label: Standby Network Status
  kind: query
  command: "<CR>*standbynet=?#<CR>"
  params: []

# Operation Settings - Standby Microphone
- id: standbymic_on
  label: Standby Microphone On
  kind: action
  command: "<CR>*standbymic=on#<CR>"
  params: []
- id: standbymic_off
  label: Standby Microphone Off
  kind: action
  command: "<CR>*standbymic=off#<CR>"
  params: []
- id: standbymic_status
  label: Standby Microphone Status
  kind: query
  command: "<CR>*standbymic=?#<CR>"
  params: []

# Operation Settings - Standby Monitor Out
- id: standbymnt_on
  label: Standby Monitor Out On
  kind: action
  command: "<CR>*standbymnt=on#<CR>"
  params: []
- id: standbymnt_off
  label: Standby Monitor Out Off
  kind: action
  command: "<CR>*standbymnt=off#<CR>"
  params: []
- id: standbymnt_status
  label: Standby Monitor Out Status
  kind: query
  command: "<CR>*standbymnt=?#<CR>"
  params: []

# Baud Rate
- id: baud_2400
  label: Baud Rate 2400
  kind: action
  command: "<CR>*baud=2400#<CR>"
  params: []
- id: baud_4800
  label: Baud Rate 4800
  kind: action
  command: "<CR>*baud=4800#<CR>"
  params: []
- id: baud_9600
  label: Baud Rate 9600
  kind: action
  command: "<CR>*baud=9600#<CR>"
  params: []
- id: baud_14400
  label: Baud Rate 14400
  kind: action
  command: "<CR>*baud=14400#<CR>"
  params: []
- id: baud_19200
  label: Baud Rate 19200
  kind: action
  command: "<CR>*baud=19200#<CR>"
  params: []
- id: baud_38400
  label: Baud Rate 38400
  kind: action
  command: "<CR>*baud=38400#<CR>"
  params: []
- id: baud_57600
  label: Baud Rate 57600
  kind: action
  command: "<CR>*baud=57600#<CR>"
  params: []
- id: baud_115200
  label: Baud Rate 115200
  kind: action
  command: "<CR>*baud=115200#<CR>"
  params: []
- id: baud_status
  label: Current Baud Rate
  kind: query
  command: "<CR>*baud=?#<CR>"
  params: []

# Lamp Control
- id: ltim_status
  label: Lamp Hours
  kind: query
  command: "<CR>*ltim=?#<CR>"
  params: []
- id: ltim2_status
  label: Lamp2 Hours
  kind: query
  command: "<CR>*ltim2=?#<CR>"
  params: []
- id: lampm_lnor
  label: Lamp Mode Normal
  kind: action
  command: "<CR>*lampm=lnor#<CR>"
  params: []
- id: lampm_eco
  label: Lamp Mode Eco
  kind: action
  command: "<CR>*lampm=eco#<CR>"
  params: []
- id: lampm_seco
  label: Lamp Mode SmartEco
  kind: action
  command: "<CR>*lampm=seco#<CR>"
  params: []
- id: lampm_seco2
  label: Lamp Mode SmartEco 2
  kind: action
  command: "<CR>*lampm= seco2#<CR>"
  params: []
- id: lampm_seco3
  label: Lamp Mode SmartEco 3
  kind: action
  command: "<CR>*lampm= seco3#<CR>"
  params: []
- id: lampm_dimming
  label: Lamp Mode Dimming
  kind: action
  command: "<CR>*lampm=dimming#<CR>"
  params: []
- id: lampm_custom
  label: Lamp Mode Custom
  kind: action
  command: "<CR>*lampm=custom#<CR>"
  params: []
- id: lampcustom_set
  label: Custom Lamp Light Level
  kind: action
  command: "<CR>*lampcustom={value}#<CR>"
  params:
    - name: value
      type: integer
      description: Custom lamp light level (range UNRESOLVED in source)
- id: lampcustom_status
  label: Custom Lamp Light Level Status
  kind: query
  command: "<CR>*lampcustom=?#<CR>"
  params: []
- id: lampm_status
  label: Lamp Mode Status
  kind: query
  command: "<CR>*lampm=?#<CR>"
  params: []
- id: modelname
  label: Model Name
  kind: query
  command: "<CR>*modelname=?#<CR>"
  params: []
- id: sysfwversion
  label: System F/W Version
  kind: query
  command: "<CR>*sysfwversion=?#<CR>"
  params: []
- id: scalerfwversion
  label: Scaler F/W Version
  kind: query
  command: "<CR>*scalerfwversion=?#<CR>"
  params: []
- id: formatfwversion
  label: Format F/W Version
  kind: query
  command: "<CR>*formatfwversion=?#<CR>"
  params: []
- id: lanfwversion
  label: LAN F/W Version
  kind: query
  command: "<CR>*lanfwversion=?#<CR>"
  params: []
- id: mcufwversion
  label: MCU F/W Version
  kind: query
  command: "<CR>*mcufwversion=?#<CR>"
  params: []
- id: ballastfwversion
  label: Ballast F/W Version
  kind: query
  command: "<CR>*ballastfwversion=?#<CR>"
  params: []

# Miscellaneous - Blank / Freeze / Menu
- id: blank_on
  label: Blank On
  kind: action
  command: "<CR>*blank=on#<CR>"
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  command: "<CR>*blank=off#<CR>"
  params: []
- id: blank_status
  label: Blank Status
  kind: query
  command: "<CR>*blank=?#<CR>"
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  command: "<CR>*freeze=on#<CR>"
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  command: "<CR>*freeze=off#<CR>"
  params: []
- id: freeze_status
  label: Freeze Status
  kind: query
  command: "<CR>*freeze=?#<CR>"
  params: []
- id: menu_on
  label: Menu On
  kind: action
  command: "<CR>*menu=on#<CR>"
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  command: "<CR>*menu=off#<CR>"
  params: []
- id: menu_status
  label: Menu Status
  kind: query
  command: "<CR>*menu=?#<CR>"
  params: []
- id: nav_up
  label: Up
  kind: action
  command: "<CR>*up#<CR>"
  params: []
- id: nav_down
  label: Down
  kind: action
  command: "<CR>*down#<CR>"
  params: []
- id: nav_right
  label: Right
  kind: action
  command: "<CR>*right#<CR>"
  params: []
- id: nav_left
  label: Left
  kind: action
  command: "<CR>*left#<CR>"
  params: []
- id: nav_enter
  label: Enter
  kind: action
  command: "<CR>*enter#<CR>"
  params: []
- id: nav_back
  label: Back
  kind: action
  command: "<CR>*back#<CR>"
  params: []
- id: sourmenu_on
  label: Source Menu On
  kind: action
  command: "<CR>*sourmenu=on#<CR>"
  params: []
- id: sourmenu_off
  label: Source Menu Off
  kind: action
  command: "<CR>*sourmenu=off#<CR>"
  params: []
- id: sourmenu_status
  label: Source Menu Status
  kind: query
  command: "<CR>*sourmenu=?#<CR>"
  params: []

# 3D
- id: threed_off
  label: 3D Sync Off
  kind: action
  command: "<CR>*3d=off#<CR>"
  params: []
- id: threed_auto
  label: 3D Auto
  kind: action
  command: "<CR>*3d=auto#<CR>"
  params: []
- id: threed_tb
  label: 3D Sync Top Bottom
  kind: action
  command: "<CR>*3d=tb#<CR>"
  params: []
- id: threed_fs
  label: 3D Sync Frame Sequential
  kind: action
  command: "<CR>*3d=fs#<CR>"
  params: []
- id: threed_fp
  label: 3D Frame Packing
  kind: action
  command: "<CR>*3d=fp#<CR>"
  params: []
- id: threed_sbs
  label: 3D Side By Side
  kind: action
  command: "<CR>*3d=sbs#<CR>"
  params: []
- id: threed_da
  label: 3D Inverter Disable
  kind: action
  command: "<CR>*3d=da#<CR>"
  params: []
- id: threed_iv
  label: 3D Inverter
  kind: action
  command: "<CR>*3d=iv#<CR>"
  params: []
- id: threed_2d3d
  label: 2D to 3D
  kind: action
  command: "<CR>*3d=2d3d#<CR>"
  params: []
- id: threed_nvidia
  label: 3D nVIDIA
  kind: action
  command: "<CR>*3d=nvidia#<CR>"
  params: []
- id: threed_status
  label: 3D Sync Status
  kind: query
  command: "<CR>*3d=?#<CR>"
  params: []

# Remote Receiver
- id: rr_on
  label: Remote Receiver On
  kind: action
  command: "<CR>*rr=on#<CR>"
  params: []
- id: rr_off
  label: Remote Receiver Off
  kind: action
  command: "<CR>*rr=off#<CR>"
  params: []
- id: rr_fr
  label: Remote Receiver Front+Rear
  kind: action
  command: "<CR>*rr=fr#<CR>"
  params: []
- id: rr_f
  label: Remote Receiver Front
  kind: action
  command: "<CR>*rr=f#<CR>"
  params: []
- id: rr_r
  label: Remote Receiver Rear
  kind: action
  command: "<CR>*rr=r#<CR>"
  params: []
- id: rr_t
  label: Remote Receiver Top
  kind: action
  command: "<CR>*rr=t#<CR>"
  params: []
- id: rr_tf
  label: Remote Receiver Top+Front
  kind: action
  command: "<CR>*rr=tf#<CR>"
  params: []
- id: rr_tr
  label: Remote Receiver Top+Rear
  kind: action
  command: "<CR>*rr=tr#<CR>"
  params: []
- id: rr_status
  label: Remote Receiver Status
  kind: query
  command: "<CR>*rr=?#<CR>"
  params: []

# Instant On
- id: ins_on
  label: Instant On
  kind: action
  command: "<CR>*ins=on#<CR>"
  params: []
- id: ins_off
  label: Instant Off
  kind: action
  command: "<CR>*ins=off#<CR>"
  params: []
- id: ins_status
  label: Instant On Status
  kind: query
  command: "<CR>*ins=?#<CR>"
  params: []

# Lamp Saver
- id: lpsaver_on
  label: Lamp Saver On
  kind: action
  command: "<CR>*lpsaver=on#<CR>"
  params: []
- id: lpsaver_off
  label: Lamp Saver Off
  kind: action
  command: "<CR>*lpsaver=off#<CR>"
  params: []
- id: lpsaver_status
  label: Lamp Saver Status
  kind: query
  command: "<CR>*lpsaver=?#<CR>"
  params: []

# Projector Login Code
- id: prjlogincode_on
  label: Projector Log In Code On
  kind: action
  command: "<CR>*prjlogincode=on#<CR>"
  params: []
- id: prjlogincode_off
  label: Projector Log In Code Off
  kind: action
  command: "<CR>*prjlogincode=off#<CR>"
  params: []
- id: prjlogincode_status
  label: Projector Log In Code Status
  kind: query
  command: "<CR>*prjlogincode=?#<CR>"
  params: []

# Broadcasting
- id: broadcasting_on
  label: Broadcasting On
  kind: action
  command: "<CR>*broadcasting=on#<CR>"
  params: []
- id: broadcasting_off
  label: Broadcasting Off
  kind: action
  command: "<CR>*broadcasting=off#<CR>"
  params: []
- id: broadcasting_status
  label: Broadcasting Status
  kind: query
  command: "<CR>*broadcasting=?#<CR>"
  params: []

# AMX Device Discovery
- id: amxdd_on
  label: AMX Device Discovery On
  kind: action
  command: "<CR>*amxdd=on#<CR>"
  params: []
- id: amxdd_off
  label: AMX Device Discovery Off
  kind: action
  command: "<CR>*amxdd=off#<CR>"
  params: []
- id: amxdd_status
  label: AMX Device Discovery Status
  kind: query
  command: "<CR>*amxdd=?#<CR>"
  params: []
- id: macaddr
  label: MAC Address
  kind: query
  command: "<CR>*macaddr=?#<CR>"
  params: []

# High Altitude
- id: highaltitude_on
  label: High Altitude Mode On
  kind: action
  command: "<CR>*Highaltitude=on#<CR>"
  params: []
- id: highaltitude_off
  label: High Altitude Mode Off
  kind: action
  command: "<CR>*Highaltitude=off#<CR>"
  params: []
- id: highaltitude_status
  label: High Altitude Mode Status
  kind: query
  command: "<CR>*Highaltitude=?#<CR>"
  params: []

# Installation - Lens Memory Load
- id: lensload_m1
  label: Load Lens Memory 1
  kind: action
  command: "<CR>*lensload=m1#<CR>"
  params: []
- id: lensload_m2
  label: Load Lens Memory 2
  kind: action
  command: "<CR>*lensload=m2#<CR>"
  params: []
- id: lensload_m3
  label: Load Lens Memory 3
  kind: action
  command: "<CR>*lensload=m3#<CR>"
  params: []
- id: lensload_m4
  label: Load Lens Memory 4
  kind: action
  command: "<CR>*lensload=m4#<CR>"
  params: []
- id: lensload_m5
  label: Load Lens Memory 5
  kind: action
  command: "<CR>*lensload=m5#<CR>"
  params: []
- id: lensload_m6
  label: Load Lens Memory 6
  kind: action
  command: "<CR>*lensload=m6#<CR>"
  params: []
- id: lensload_m7
  label: Load Lens Memory 7
  kind: action
  command: "<CR>*lensload=m7#<CR>"
  params: []
- id: lensload_m8
  label: Load Lens Memory 8
  kind: action
  command: "<CR>*lensload=m8#<CR>"
  params: []
- id: lensload_m9
  label: Load Lens Memory 9
  kind: action
  command: "<CR>*lensload=m9#<CR>"
  params: []
- id: lensload_m10
  label: Load Lens Memory 10
  kind: action
  command: "<CR>*lensload=m10#<CR>"
  params: []
- id: lensload_status
  label: Lens Memory Load Status
  kind: query
  command: "<CR>*lensload=?#<CR>"
  params: []

# Installation - Lens Memory Save
- id: lenssave_m1
  label: Save Lens Memory 1
  kind: action
  command: "<CR>*lenssave=m1#<CR>"
  params: []
- id: lenssave_m2
  label: Save Lens Memory 2
  kind: action
  command: "<CR>*lenssave=m2#<CR>"
  params: []
- id: lenssave_m3
  label: Save Lens Memory 3
  kind: action
  command: "<CR>*lenssave=m3#<CR>"
  params: []
- id: lenssave_m4
  label: Save Lens Memory 4
  kind: action
  command: "<CR>*lenssave=m4#<CR>"
  params: []
- id: lenssave_m5
  label: Save Lens Memory 5
  kind: action
  command: "<CR>*lenssave=m5#<CR>"
  params: []
- id: lenssave_m6
  label: Save Lens Memory 6
  kind: action
  command: "<CR>*lenssave=m6#<CR>"
  params: []
- id: lenssave_m7
  label: Save Lens Memory 7
  kind: action
  command: "<CR>*lenssave=m7#<CR>"
  params: []
- id: lenssave_m8
  label: Save Lens Memory 8
  kind: action
  command: "<CR>*lenssave=m8#<CR>"
  params: []
- id: lenssave_m9
  label: Save Lens Memory 9
  kind: action
  command: "<CR>*lenssave=m9#<CR>"
  params: []
- id: lenssave_m10
  label: Save Lens Memory 10
  kind: action
  command: "<CR>*lenssave=m10#<CR>"
  params: []
- id: lensreset_center
  label: Reset Lens to Center
  kind: action
  command: "<CR>*lensreset=center#<CR>"
  params: []
```

## Feedbacks
```yaml
# Source lists query responses only as the same mnemonics with `=?`; no explicit
# response-format table. Variables section below covers typed queryable values.
- id: power_state
  type: enum
  values: [on, off]
  query_command: "<CR>*pow=?#<CR>"
- id: mute_state
  type: enum
  values: [on, off]
  query_command: "<CR>*mute=?#<CR>"
- id: current_source
  type: string
  query_command: "<CR>*sour=?#<CR>"
- id: appmod_current
  type: string
  query_command: "<CR>*appmod=?#<CR>"
- id: blank_state
  type: enum
  values: [on, off]
  query_command: "<CR>*blank=?#<CR>"
- id: freeze_state
  type: enum
  values: [on, off]
  query_command: "<CR>*freeze=?#<CR>"
- id: menu_state
  type: enum
  values: [on, off]
  query_command: "<CR>*menu=?#<CR>"
- id: sourmenu_state
  type: enum
  values: [on, off]
  query_command: "<CR>*sourmenu=?#<CR>"
- id: ct_state
  type: string
  query_command: "<CR>*ct=?#<CR>"
- id: asp_state
  type: string
  query_command: "<CR>*asp=?#<CR>"
- id: bc_state
  type: enum
  values: [on, off]
  query_command: "<CR>*BC=?#<CR>"
- id: hdr_state
  type: string
  query_command: "<CR>*hdr=?#<CR>"
- id: pp_state
  type: string
  query_command: "<CR>*pp=?#<CR>"
- id: standbynet_state
  type: enum
  values: [on, off]
  query_command: "<CR>*standbynet=?#<CR>"
- id: directpower_state
  type: enum
  values: [on, off]
  query_command: "<CR>*directpower=?#<CR>"
- id: menuposition_state
  type: string
  query_command: "<CR>*menuposition=?#<CR>"
- id: qas_state
  type: enum
  values: [on, off]
  query_command: "<CR>*QAS=?#<CR>"
- id: lampm_state
  type: string
  query_command: "<CR>*lampm=?#<CR>"
- id: lampcustom_state
  type: integer
  query_command: "<CR>*lampcustom=?#<CR>"
- id: qcool_state
  type: enum
  values: [on, off]
  query_command: "<CR>*qcool=?#<CR>"
- id: rr_state
  type: string
  query_command: "<CR>*rr=?#<CR>"
- id: highaltitude_state
  type: enum
  values: [on, off]
  query_command: "<CR>*Highaltitude=?#<CR>"
- id: threed_state
  type: string
  query_command: "<CR>*3d=?#<CR>"
- id: audiosour_state
  type: string
  query_command: "<CR>*audiosour=?#<CR>"
- id: vol_state
  type: integer
  query_command: "<CR>*vol=?#<CR>"
- id: micvol_state
  type: integer
  query_command: "<CR>*micvol=?#<CR>"
- id: vkeystone_state
  type: integer
  query_command: "<CR>*vkeystone=?#<CR>"
- id: hkeystone_state
  type: integer
  query_command: "<CR>*hkeystone=?#<CR>"
- id: overscan_state
  type: integer
  query_command: "<CR>*overscan=?#<CR>"
- id: con_state
  type: integer
  query_command: "<CR>*con=?#<CR>"
- id: bri_state
  type: integer
  query_command: "<CR>*bri=?#<CR>"
- id: color_state
  type: integer
  query_command: "<CR>*color=?#<CR>"
- id: sharp_state
  type: integer
  query_command: "<CR>*sharp=?#<CR>"
- id: fleshtone_state
  type: integer
  query_command: "<CR>*fleshtone=?#<CR>"
- id: ltim_state
  type: integer
  query_command: "<CR>*ltim=?#<CR>"
- id: ltim2_state
  type: integer
  query_command: "<CR>*ltim2=?#<CR>"
- id: baud_state
  type: integer
  query_command: "<CR>*baud=?#<CR>"
- id: modelname_state
  type: string
  query_command: "<CR>*modelname=?#<CR>"
- id: macaddr_state
  type: string
  query_command: "<CR>*macaddr=?#<CR>"
- id: broadcasting_state
  type: enum
  values: [on, off]
  query_command: "<CR>*broadcasting=?#<CR>"
- id: amxdd_state
  type: enum
  values: [on, off]
  query_command: "<CR>*amxdd=?#<CR>"
- id: ins_state
  type: enum
  values: [on, off]
  query_command: "<CR>*ins=?#<CR>"
- id: lpsaver_state
  type: enum
  values: [on, off]
  query_command: "<CR>*lpsaver=?#<CR>"
- id: prjlogincode_state
  type: enum
  values: [on, off]
  query_command: "<CR>*prjlogincode=?#<CR>"
- id: standbymic_state
  type: enum
  values: [on, off]
  query_command: "<CR>*standbymic=?#<CR>"
- id: standbymnt_state
  type: enum
  values: [on, off]
  query_command: "<CR>*standbymnt=?#<CR>"
- id: autopower_state
  type: enum
  values: [on, off]
  query_command: "<CR>*autopower=?#<CR>"
```

## Variables
```yaml
# Settable scalar parameters exposed as parameterized actions above; the
# spec models numeric ranges as UNRESOLVED where source did not state them.
- id: contrast
  type: integer
  range: null  # UNRESOLVED: range not stated in source
  set_command: "<CR>*con={value}#<CR>"
  query_command: "<CR>*con=?#<CR>"
- id: brightness
  type: integer
  range: null  # UNRESOLVED
  set_command: "<CR>*bri={value}#<CR>"
  query_command: "<CR>*bri=?#<CR>"
- id: color
  type: integer
  range: null  # UNRESOLVED
  set_command: "<CR>*color={value}#<CR>"
  query_command: "<CR>*color=?#<CR>"
- id: sharpness
  type: integer
  range: null  # UNRESOLVED
  set_command: "<CR>*sharp={value}#<CR>"
  query_command: "<CR>*sharp=?#<CR>"
- id: fleshtone
  type: integer
  range: null  # UNRESOLVED
  set_command: "<CR>*fleshtone={value}#<CR>"
  query_command: "<CR>*fleshtone=?#<CR>"
- id: volume
  type: integer
  range: null  # UNRESOLVED
  set_command: "<CR>*vol={value}#<CR>"
  query_command: "<CR>*vol=?#<CR>"
- id: mic_volume
  type: integer
  range: null  # UNRESOLVED
  set_command: "<CR>*micvol=+#<CR>"  # source only exposes + / -; no `value` form
  query_command: "<CR>*micvol=?#<CR>"
- id: lamp_custom_level
  type: integer
  range: null  # UNRESOLVED
  set_command: "<CR>*lampcustom={value}#<CR>"
  query_command: "<CR>*lampcustom=?#<CR>"
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications. The doc
# only describes request/response behavior and error echoes.
```

## Macros
```yaml
# UNRESOLVED: source does not describe any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Operational notes only (e.g. standby
# power ≤0.5W for commands to be accepted over LAN) live in Notes.
```

## Notes
- Command framing quirk: every command is wrapped in `<CR>...<CR>` per source ("a command works whether it starts and ends with `<CR>`"). Implementations should send the literal ASCII carriage return bytes around the mnemonic, not just newline.
- RS-232 and TCP transports are behaviorally identical — same command set, same framing, same error echoes (`Illegal format`, `Unsupported item`, `Block item`).
- LAN transport: source explicitly says "Input 8000 in the TCP port # field." HDBaseT path uses the same serial setup (no TCP framing details given beyond the LAN section).
- Standby requirement: "Commands are working if the standby power is 0.5W or a supported baud rate of the projector is set." If LAN control appears dead, check that standby network (`*standbynet=on#`) is enabled.
- Baud rate must be changed via the projector OSD; the `*baud=*#` command itself changes the *serial port* setting.
- Cable note: crossover (null-modem) cable required for direct RS-232 attach to PC D-Sub 9.
- "Support: Yes/No" column in the source command table enumerates features available on the W5850. Commands marked "No" still parse but echo `Unsupported item` on W5850.
<!-- UNRESOLVED: numeric value ranges (volume, contrast, brightness, color, sharpness, fleshtone, lamp custom, keystone) not stated in source. Error-recovery behavior beyond three documented echo strings not described. Firmware version dependencies not stated. -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W5850/W5850_RS232%20Control%20Guide_1.01_Windows_250314093002.pdf"
retrieved_at: 2026-07-24T18:42:01.883Z
last_checked_at: 2026-08-05T08:12:44.269Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:12:44.269Z
matched_actions: 342
action_count: 342
confidence: medium
summary: "All 342 spec action units are present in source command table; transport values verbatim; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range, HDBaseT-extender LAN behavior (only LAN cable described), exact list of features actually supported on W5850 vs. broader catalogue (column \"Support: Yes\" used as ground truth in Actions)."
- "range not stated in source"
- "source does not document any unsolicited notifications. The doc"
- "source does not describe any multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "numeric value ranges (volume, contrast, brightness, color, sharpness, fleshtone, lamp custom, keystone) not stated in source. Error-recovery behavior beyond three documented echo strings not described. Firmware version dependencies not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
