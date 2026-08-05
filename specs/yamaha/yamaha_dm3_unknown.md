---
spec_id: admin/yamaha-dm3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha DM3 Control Spec"
manufacturer: Yamaha
model_family: DM3
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - DM3
    - DM3S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usa.yamaha.com
  - manual.yamaha.com
source_urls:
  - https://usa.yamaha.com/files/download/other_assets/2/2063222/DM3_osc_specs_v100_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/8/1626438/dm3_en_dl_a0.pdf
  - https://manual.yamaha.com/pa/mixers/dm3/rm/en-US/
  - https://usa.yamaha.com/files/download/other_assets/1/1525801/dm3_en_om_b1.pdf
retrieved_at: 2026-07-22T01:38:22.694Z
last_checked_at: 2026-07-22T08:03:56.345Z
generated_at: 2026-07-22T08:03:56.345Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "authentication, unsolicited event behavior, response payloads, and safety procedures are not stated in source."
  - "source documents query operations but does not specify response payloads."
  - "source lists settable parameters, but does not define separate variable objects."
  - "unsolicited notifications are not stated in source."
  - "multi-step sequences are not stated in source."
  - "safety warnings, interlocks, and power-on sequencing are not stated in source."
  - "source does not state firmware compatibility, authentication credentials, response syntax, unsolicited events, or error recovery behavior."
verification:
  verdict: verified
  checked_at: 2026-07-22T08:03:56.345Z
  matched_actions: 127
  action_count: 127
  confidence: medium
  summary: "All 127 spec actions verified in source with exact wire-literal matches; complete 1:1 command coverage and transport parameters confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Yamaha DM3 Control Spec

## Summary
Yamaha DM3 Series consoles support remote control through OSC over Ethernet. The source documents UDP port 49900, OSC request syntax, mixer parameter control, scene recall, scene queries, channel labeling, routing, levels, mute groups, link parameters, and local input controls.

<!-- UNRESOLVED: authentication, unsolicited event behavior, response payloads, and safety procedures are not stated in source. -->

## Transport
```yaml
protocols:
  - osc
  - udp
addressing:
  port: 49900
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from routing commands
- queryable  # inferred from scene query commands
- levelable  # inferred from fader, send, balance, and gain commands
```

## Actions
```yaml
- id: input_channel_fader_level
  label: Input Channel Fader Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/Fader/Level/{input_channel}/1 {level}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number, 1-16
    - name: level
      type: integer
      description: Fader value, -32768 to 1000

- id: input_channel_fader_on
  label: Input Channel Fader On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/Fader/On/{input_channel}/1 {on}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number, 1-16
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: input_channel_to_stereo_pan
  label: Input Channel To Stereo Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToSt/Pan/{input_channel}/1 {pan}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number, 1-16
    - name: pan
      type: integer
      description: Pan value, -63 to 63

- id: input_channel_to_stereo_on
  label: Input Channel To Stereo On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToSt/On/{input_channel}/{stereo_bus} {on}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number, 1-16
    - name: stereo_bus
      type: integer
      description: Stereo bus number
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: input_channel_label_name
  label: Input Channel Label Name
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/Label/Name/{input_channel}/1 {name}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number, 1-16
    - name: name
      type: string
      description: Maximum length 8 characters

- id: input_channel_label_color
  label: Input Channel Label Color
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/Label/Color/{input_channel}/1 {color}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number, 1-16
    - name: color
      type: string
      description: Blue, Green, Orange, Pink, Purple, Red, SkyBlue, Yellow, Cyan, Magenta, or Off

- id: input_channel_label_icon
  label: Input Channel Label Icon
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/Label/Icon/{input_channel}/1 {icon}"
  params:
    - name: input_channel
      type: integer
      description: Icon value listed in source Table 4

- id: input_channel_label_category
  label: Input Channel Label Category
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/Label/Category/{input_channel}/1 {category}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number, 1-16
    - name: category
      type: string
      description: ----, Vocal, Drums, Guitars, Keys, Horns, Strings, Spoken, FX RTN, or Others

- id: input_channel_to_mix_level
  label: Input Channel To Mix Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToMix/Level/{input_channel}/{mix_channel} {level}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number, 1-16
    - name: mix_channel
      type: integer
      description: Mix channel number, 1-6
    - name: level
      type: integer
      description: Send level, -32768 to 1000

- id: input_channel_to_mix_on
  label: Input Channel To Mix On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToMix/On/{input_channel}/{mix_channel} {on}"
  params:
    - name: input_channel
      type: integer
    - name: mix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: input_channel_to_mix_pan
  label: Input Channel To Mix Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToMix/Pan/{input_channel}/{mix_channel} {pan}"
  params:
    - name: input_channel
      type: integer
    - name: mix_channel
      type: integer
    - name: pan
      type: integer
      description: Pan value, -63 to 63

- id: input_channel_to_mix_pre_post
  label: Input Channel To Mix Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToMix/PrePost/{input_channel}/{mix_channel} {pre_post}"
  params:
    - name: input_channel
      type: integer
    - name: mix_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: input_channel_to_fx_level
  label: Input Channel To FX Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToFx/Level/{input_channel}/{fx_channel} {level}"
  params:
    - name: input_channel
      type: integer
    - name: fx_channel
      type: integer
      description: FX channel number
    - name: level
      type: integer
      description: Send level, -32768 to 1000

- id: input_channel_to_fx_on
  label: Input Channel To FX On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToFx/On/{input_channel}/{fx_channel} {on}"
  params:
    - name: input_channel
      type: integer
    - name: fx_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: input_channel_to_fx_pre_post
  label: Input Channel To FX Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToFx/PrePost/{input_channel}/{fx_channel} {pre_post}"
  params:
    - name: input_channel
      type: integer
    - name: fx_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: input_channel_to_matrix_level
  label: Input Channel To Matrix Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToMtrx/Level/{input_channel}/{matrix_channel} {level}"
  params:
    - name: input_channel
      type: integer
    - name: matrix_channel
      type: integer
      description: Matrix channel number, 1-2
    - name: level
      type: integer
      description: Send level, -32768 to 1000

- id: input_channel_to_matrix_on
  label: Input Channel To Matrix On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToMtrx/On/{input_channel}/{matrix_channel} {on}"
  params:
    - name: input_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: input_channel_to_matrix_pan
  label: Input Channel To Matrix Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToMtrx/Pan/{input_channel}/{matrix_channel} {pan}"
  params:
    - name: input_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: pan
      type: integer
      description: Pan value, -63 to 63

- id: input_channel_to_matrix_pre_post
  label: Input Channel To Matrix Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/InCh/ToMtrx/PrePost/{input_channel}/{matrix_channel} {pre_post}"
  params:
    - name: input_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: input_channel_link_assign
  label: Input Channel Link Assign
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/InCh/Assign/{input_channel}/1 {link_group}"
  params:
    - name: input_channel
      type: integer
      description: Input channel number
    - name: link_group
      type: integer
      description: 0 NONE, 1 A through 9 I

- id: stereo_input_channel_fader_level
  label: Stereo Input Channel Fader Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/Fader/Level/{stereo_input_channel}/1 {level}"
  params:
    - name: stereo_input_channel
      type: integer
      description: Stereo input channel number, 1-2
    - name: level
      type: integer

- id: stereo_input_channel_fader_on
  label: Stereo Input Channel Fader On
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/Fader/On/{stereo_input_channel}/1 {on}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_input_channel_to_stereo_pan
  label: Stereo Input Channel To Stereo Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToSt/Pan/{stereo_input_channel}/1 {pan}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: pan
      type: integer
      description: Pan value, -63 to 63

- id: stereo_input_channel_to_stereo_on
  label: Stereo Input Channel To Stereo On
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToSt/On/{stereo_input_channel}/{stereo_bus} {on}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: stereo_bus
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_input_channel_label_name
  label: Stereo Input Channel Label Name
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/Label/Name/{stereo_input_channel}/1 {name}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: name
      type: string
      description: Maximum length 8 characters

- id: stereo_input_channel_label_color
  label: Stereo Input Channel Label Color
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/Label/Color/{stereo_input_channel}/1 {color}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: color
      type: string

- id: stereo_input_channel_label_icon
  label: Stereo Input Channel Label Icon
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/Label/Icon/{stereo_input_channel}/1 {icon}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: icon
      type: string

- id: stereo_input_channel_label_category
  label: Stereo Input Channel Label Category
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/Label/Category/{stereo_input_channel}/1 {category}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: category
      type: string

- id: stereo_input_channel_to_mix_level
  label: Stereo Input Channel To Mix Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToMix/Level/{stereo_input_channel}/1 {level}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: level
      type: integer

- id: stereo_input_channel_to_mix_on
  label: Stereo Input Channel To Mix On
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToMix/On/{stereo_input_channel}/1 {on}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_input_channel_to_mix_pan
  label: Stereo Input Channel To Mix Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToMix/Pan/{stereo_input_channel}/1 {pan}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: pan
      type: integer

- id: stereo_input_channel_to_mix_pre_post
  label: Stereo Input Channel To Mix Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToMix/PrePost/{stereo_input_channel}/1 {pre_post}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_input_channel_to_fx_level
  label: Stereo Input Channel To FX Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToFx/Level/{stereo_input_channel}/{fx_channel} {level}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: fx_channel
      type: integer
    - name: level
      type: integer

- id: stereo_input_channel_to_fx_on
  label: Stereo Input Channel To FX On
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToFx/On/{stereo_input_channel}/{fx_channel} {on}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: fx_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_input_channel_to_fx_pre_post
  label: Stereo Input Channel To FX Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToFx/PrePost/{stereo_input_channel}/{fx_channel} {pre_post}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: fx_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_input_channel_to_matrix_level
  label: Stereo Input Channel To Matrix Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToMtrx/Level/{stereo_input_channel}/{matrix_channel} {level}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: level
      type: integer

- id: stereo_input_channel_to_matrix_on
  label: Stereo Input Channel To Matrix On
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToMtrx/On/{stereo_input_channel}/{matrix_channel} {on}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_input_channel_to_matrix_pan
  label: Stereo Input Channel To Matrix Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToMtrx/Pan/{stereo_input_channel}/{matrix_channel} {pan}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: pan
      type: integer

- id: stereo_input_channel_to_matrix_pre_post
  label: Stereo Input Channel To Matrix Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/StInCh/ToMtrx/PrePost/{stereo_input_channel}/{matrix_channel} {pre_post}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_input_channel_link_assign
  label: Stereo Input Channel Link Assign
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/StInCh/Assign/{stereo_input_channel}/1 {link_group}"
  params:
    - name: stereo_input_channel
      type: integer
    - name: link_group
      type: integer

- id: fx_return_channel_fader_level
  label: FX Return Channel Fader Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/Fader/Level/{fx_return_channel}/1 {level}"
  params:
    - name: fx_return_channel
      type: integer
    - name: level
      type: integer

- id: fx_return_channel_fader_on
  label: FX Return Channel Fader On
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/Fader/On/{fx_return_channel}/1 {on}"
  params:
    - name: fx_return_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: fx_return_channel_to_stereo_pan
  label: FX Return Channel To Stereo Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToSt/Pan/{fx_return_channel}/1 {pan}"
  params:
    - name: fx_return_channel
      type: integer
    - name: pan
      type: integer

- id: fx_return_channel_to_stereo_on
  label: FX Return Channel To Stereo On
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToSt/On/{fx_return_channel}/{stereo_bus} {on}"
  params:
    - name: fx_return_channel
      type: integer
    - name: stereo_bus
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: fx_return_channel_label_name
  label: FX Return Channel Label Name
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/Label/Name/{fx_return_channel}/1 {name}"
  params:
    - name: fx_return_channel
      type: integer
    - name: name
      type: string
      description: Maximum length 8 characters

- id: fx_return_channel_label_color
  label: FX Return Channel Label Color
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/Label/Color/{fx_return_channel}/1 {color}"
  params:
    - name: fx_return_channel
      type: integer
    - name: color
      type: string

- id: fx_return_channel_label_icon
  label: FX Return Channel Label Icon
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/Label/Icon/{fx_return_channel}/1 {icon}"
  params:
    - name: fx_return_channel
      type: integer
    - name: icon
      type: string

- id: fx_return_channel_label_category
  label: FX Return Channel Label Category
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/Label/Category/{fx_return_channel}/1 FX RTN"
  params:
    - name: fx_return_channel
      type: integer
    - name: category
      type: string

- id: fx_return_channel_to_mix_level
  label: FX Return Channel To Mix Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToMix/Level/{fx_return_channel}/1 {level}"
  params:
    - name: fx_return_channel
      type: integer
    - name: level
      type: integer

- id: fx_return_channel_to_mix_on
  label: FX Return Channel To Mix On
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToMix/On/{fx_return_channel}/1 {on}"
  params:
    - name: fx_return_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: fx_return_channel_to_mix_pan
  label: FX Return Channel To Mix Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToMix/Pan/{fx_return_channel}/1 {pan}"
  params:
    - name: fx_return_channel
      type: integer
    - name: pan
      type: integer

- id: fx_return_channel_to_mix_pre_post
  label: FX Return Channel To Mix Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToMix/PrePost/{fx_return_channel}/1 {pre_post}"
  params:
    - name: fx_return_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: fx_return_channel_to_fx_level
  label: FX Return Channel To FX Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToFx/Level/{fx_return_channel}/{fx_channel} {level}"
  params:
    - name: fx_return_channel
      type: integer
    - name: fx_channel
      type: integer
    - name: level
      type: integer

- id: fx_return_channel_to_fx_on
  label: FX Return Channel To FX On
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToFx/On/{fx_return_channel}/{fx_channel} {on}"
  params:
    - name: fx_return_channel
      type: integer
    - name: fx_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: fx_return_channel_to_fx_pre_post
  label: FX Return Channel To FX Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToFx/PrePost/{fx_return_channel}/{fx_channel} {pre_post}"
  params:
    - name: fx_return_channel
      type: integer
    - name: fx_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: fx_return_channel_to_matrix_level
  label: FX Return Channel To Matrix Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToMtrx/Level/{fx_return_channel}/{matrix_channel} {level}"
  params:
    - name: fx_return_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: level
      type: integer

- id: fx_return_channel_to_matrix_on
  label: FX Return Channel To Matrix On
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToMtrx/On/{fx_return_channel}/{matrix_channel} {on}"
  params:
    - name: fx_return_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: fx_return_channel_to_matrix_pan
  label: FX Return Channel To Matrix Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToMtrx/Pan/{fx_return_channel}/{matrix_channel} {pan}"
  params:
    - name: fx_return_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: pan
      type: integer

- id: fx_return_channel_to_matrix_pre_post
  label: FX Return Channel To Matrix Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/FxRtnCh/ToMtrx/PrePost/{fx_return_channel}/{matrix_channel} {pre_post}"
  params:
    - name: fx_return_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: fx_return_channel_link_assign
  label: FX Return Channel Link Assign
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/FxRtnCh/Assign/{fx_return_channel}/1 {link_group}"
  params:
    - name: fx_return_channel
      type: integer
    - name: fx_return_channel
      type: integer
    - name: link_group
      type: integer

- id: mix_channel_fader_level
  label: Mix Channel Fader Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/Fader/Level/{mix_channel}/1 {level}"
  params:
    - name: mix_channel
      type: integer
      description: Mix channel number, 1-6
    - name: level
      type: integer

- id: mix_channel_fader_on
  label: Mix Channel Fader On
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/Fader/On/{mix_channel}/1 {on}"
  params:
    - name: mix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: mix_channel_pan_link
  label: Mix Channel Pan Link
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/PanLink/{mix_channel}/1 {on}"
  params:
    - name: mix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: mix_channel_to_stereo_pan
  label: Mix Channel To Stereo Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/ToSt/Pan/{mix_channel}/1 {pan}"
  params:
    - name: mix_channel
      type: integer
    - name: pan
      type: integer

- id: mix_channel_to_stereo_on
  label: Mix Channel To Stereo On
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/ToSt/On/{mix_channel}/{stereo_bus} {on}"
  params:
    - name: mix_channel
      type: integer
    - name: stereo_bus
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: mix_channel_output_balance
  label: Mix Channel Output Balance
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/Out/Balance/{mix_channel}/1 {balance}"
  params:
    - name: mix_channel
      type: integer
    - name: balance
      type: integer

- id: mix_channel_label_name
  label: Mix Channel Label Name
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/Label/Name/{mix_channel}/1 {name}"
  params:
    - name: mix_channel
      type: integer
    - name: name
      type: string
      description: Maximum length 8 characters

- id: mix_channel_label_color
  label: Mix Channel Label Color
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/Label/Color/{mix_channel}/1 {color}"
  params:
    - name: mix_channel
      type: integer
    - name: color
      type: string

- id: mix_channel_label_icon
  label: Mix Channel Label Icon
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/Label/Icon/{mix_channel}/1 {icon}"
  params:
    - name: mix_channel
      type: integer
    - name: icon
      type: string

- id: mix_channel_label_category
  label: Mix Channel Label Category
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/Label/Category/{mix_channel}/1 {category}"
  params:
    - name: mix_channel
      type: integer
    - name: category
      type: string
      description: ----, FX, Output, or Others

- id: mix_channel_to_matrix_level
  label: Mix Channel To Matrix Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/ToMtrx/Level/{mix_channel}/{matrix_channel} {level}"
  params:
    - name: mix_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: level
      type: integer

- id: mix_channel_to_matrix_on
  label: Mix Channel To Matrix On
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/ToMtrx/On/{mix_channel}/{matrix_channel} {on}"
  params:
    - name: mix_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: mix_channel_to_matrix_pan
  label: Mix Channel To Matrix Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/ToMtrx/Pan/{mix_channel}/{matrix_channel} {pan}"
  params:
    - name: mix_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: pan
      type: integer

- id: mix_channel_to_matrix_pre_post
  label: Mix Channel To Matrix Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mix/ToMtrx/PrePost/{mix_channel}/{matrix_channel} {pre_post}"
  params:
    - name: mix_channel
      type: integer
    - name: matrix_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_channel_fader_level
  label: Stereo Channel Fader Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/Fader/Level/1/1 {level}"
  params:
    - name: level
      type: integer

- id: stereo_channel_fader_on
  label: Stereo Channel Fader On
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/Fader/On/1/1 {on}"
  params:
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_channel_output_balance
  label: Stereo Channel Output Balance
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/Out/Balance/1/1 {balance}"
  params:
    - name: balance
      type: integer

- id: stereo_channel_label_name
  label: Stereo Channel Label Name
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/Label/Name/1/1 {name}"
  params:
    - name: name
      type: string
      description: Maximum length 8 characters

- id: stereo_channel_label_color
  label: Stereo Channel Label Color
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/Label/Color/1/1 {color}"
  params:
    - name: color
      type: string

- id: stereo_channel_label_icon
  label: Stereo Channel Label Icon
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/Label/Icon/1/1 {icon}"
  params:
    - name: icon
      type: string

- id: stereo_channel_label_category
  label: Stereo Channel Label Category
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/Label/Category/1/1 {category}"
  params:
    - name: category
      type: string
      description: ----, FX, Output, or Others

- id: stereo_channel_to_matrix_level
  label: Stereo Channel To Matrix Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/ToMtrx/Level/1/{matrix_channel} {level}"
  params:
    - name: matrix_channel
      type: integer
    - name: level
      type: integer

- id: stereo_channel_to_matrix_on
  label: Stereo Channel To Matrix On
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/ToMtrx/On/1/{matrix_channel} {on}"
  params:
    - name: matrix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: stereo_channel_to_matrix_pan
  label: Stereo Channel To Matrix Pan
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/ToMtrx/Pan/1/{matrix_channel} {pan}"
  params:
    - name: matrix_channel
      type: integer
    - name: pan
      type: integer

- id: stereo_channel_to_matrix_pre_post
  label: Stereo Channel To Matrix Pre Post
  kind: action
  command: "/yosc:req/set/MIXER:Current/St/ToMtrx/PrePost/1/{matrix_channel} {pre_post}"
  params:
    - name: matrix_channel
      type: integer
    - name: pre_post
      type: integer
      description: 0 OFF, 1 ON

- id: matrix_channel_fader_level
  label: Matrix Channel Fader Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mtrx/Fader/Level/{matrix_channel}/1 {level}"
  params:
    - name: matrix_channel
      type: integer
    - name: level
      type: integer

- id: matrix_channel_fader_on
  label: Matrix Channel Fader On
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mtrx/Fader/On/{matrix_channel}/1 {on}"
  params:
    - name: matrix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: matrix_channel_label_name
  label: Matrix Channel Label Name
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mtrx/Label/Name/{matrix_channel}/1 {name}"
  params:
    - name: matrix_channel
      type: integer
    - name: name
      type: string
      description: Maximum length 8 characters

- id: matrix_channel_label_color
  label: Matrix Channel Label Color
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mtrx/Label/Color/{matrix_channel}/1 {color}"
  params:
    - name: matrix_channel
      type: integer
    - name: color
      type: string

- id: matrix_channel_label_icon
  label: Matrix Channel Label Icon
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mtrx/Label/Icon/{matrix_channel}/1 {icon}"
  params:
    - name: matrix_channel
      type: integer
    - name: icon
      type: string

- id: matrix_channel_label_category
  label: Matrix Channel Label Category
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mtrx/Label/Category/{matrix_channel}/1 {category}"
  params:
    - name: matrix_channel
      type: integer
    - name: category
      type: string
      description: ----, FX, Output, or Others

- id: matrix_channel_pan_link
  label: Matrix Channel Pan Link
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mtrx/PanLink/{matrix_channel}/1 {on}"
  params:
    - name: matrix_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: matrix_channel_output_balance
  label: Matrix Channel Output Balance
  kind: action
  command: "/yosc:req/set/MIXER:Current/Mtrx/Out/Balance/{matrix_channel}/1 {balance}"
  params:
    - name: matrix_channel
      type: integer
    - name: balance
      type: integer

- id: fx_channel_fader_level
  label: FX Channel Fader Level
  kind: action
  command: "/yosc:req/set/MIXER:Current/Fx/Fader/Level/{fx_channel}/1 {level}"
  params:
    - name: fx_channel
      type: integer
    - name: level
      type: integer

- id: fx_channel_fader_on
  label: FX Channel Fader On
  kind: action
  command: "/yosc:req/set/MIXER:Current/Fx/Fader/On/{fx_channel}/1 {on}"
  params:
    - name: fx_channel
      type: integer
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: fx_channel_label_name
  label: FX Channel Label Name
  kind: action
  command: "/yosc:req/set/MIXER:Current/Fx/Label/Name/{fx_channel}/1 {name}"
  params:
    - name: fx_channel
      type: integer
    - name: name
      type: string
      description: Maximum length 8 characters

- id: fx_channel_label_color
  label: FX Channel Label Color
  kind: action
  command: "/yosc:req/set/MIXER:Current/Fx/Label/Color/{fx_channel}/1 {color}"
  params:
    - name: fx_channel
      type: integer
    - name: color
      type: string

- id: fx_channel_label_icon
  label: FX Channel Label Icon
  kind: action
  command: "/yosc:req/set/MIXER:Current/Fx/Label/Icon/{fx_channel}/1 {icon}"
  params:
    - name: fx_channel
      type: integer
    - name: icon
      type: string

- id: fx_channel_label_category
  label: FX Channel Label Category
  kind: action
  command: "/yosc:req/set/MIXER:Current/Fx/Label/Category/{fx_channel}/1 {category}"
  params:
    - name: fx_channel
      type: integer
    - name: category
      type: string

- id: mute_group_on
  label: Mute Group On
  kind: action
  command: "/yosc:req/set/MIXER:Current/MuteGrpCtrl/On/{mute_group}/1 {on}"
  params:
    - name: mute_group
      type: integer
      description: Mute group number, 1-6
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: mute_group_label_name
  label: Mute Group Label Name
  kind: action
  command: "/yosc:req/set/MIXER:Current/MuteGrpCtrl/Label/Name/{mute_group}/1 {name}"
  params:
    - name: mute_group
      type: integer
    - name: name
      type: string
      description: Maximum length 8 characters

- id: input_link_parameter_eq
  label: Input Link Parameter EQ
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/EQ/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
      description: Link group, 1-9
    - name: on
      type: integer

- id: input_link_parameter_fader
  label: Input Link Parameter Fader
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/Fader/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_channel_on
  label: Input Link Parameter Channel On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/ChOn/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_to_stereo
  label: Input Link Parameter To Stereo
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/ToSt/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_mute
  label: Input Link Parameter Mute
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/Mute/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_matrix_send
  label: Input Link Parameter Matrix Send
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/MtrxSend/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_matrix_send_on
  label: Input Link Parameter Matrix Send On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/MtrxSendOn/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_fx_send
  label: Input Link Parameter FX Send
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/FxSend/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_fx_send_on
  label: Input Link Parameter FX Send On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/FxSendOn/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_ha
  label: Input Link Parameter HA
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/HA/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_hpf
  label: Input Link Parameter HPF
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/HPF/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_digital_gain
  label: Input Link Parameter Digital Gain
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/DigitalGain/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_mix_send
  label: Input Link Parameter Mix Send
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/MixSend/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_mix_send_on
  label: Input Link Parameter Mix Send On
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/MixSendOn/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_delay
  label: Input Link Parameter Delay
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/Delay/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_dynamics1
  label: Input Link Parameter Dynamics1
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/Dyna1/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_dynamics2
  label: Input Link Parameter Dynamics2
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/LinkParams/Dyna2/{link_group}/1 {on}"
  params:
    - name: link_group
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_to_mix
  label: Input Link Parameter To Mix
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/SendParams/ToMix/{link_group}/{mix_channel} {on}"
  params:
    - name: link_group
      type: integer
    - name: mix_channel
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_to_matrix
  label: Input Link Parameter To Matrix
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/SendParams/ToMtrx/{link_group}/{matrix_channel} {on}"
  params:
    - name: link_group
      type: integer
    - name: matrix_channel
      type: integer
    - name: on
      type: integer

- id: input_link_parameter_to_fx
  label: Input Link Parameter To FX
  kind: action
  command: "/yosc:req/set/MIXER:Current/InputChLink/SendParams/ToFx/{link_group}/{fx_channel} {on}"
  params:
    - name: link_group
      type: integer
    - name: fx_channel
      type: integer
    - name: on
      type: integer

- id: local_input_ha_gain
  label: Local Input HA Gain
  kind: action
  command: "/yosc:req/set/IO:Current/InCh/HAGain/{local_input}/1 {gain}"
  params:
    - name: local_input
      type: integer
      description: Local input number, 1-16
    - name: gain
      type: integer
      description: Gain value, 0-64

- id: local_input_48v_on
  label: Local Input 48V On
  kind: action
  command: "/yosc:req/set/IO:Current/InCh/48VOn/{local_input}/1 {on}"
  params:
    - name: local_input
      type: integer
      description: Local input number, 1-16
    - name: on
      type: integer
      description: 0 OFF, 1 ON

- id: scene_recall_a
  label: Recall Scene A
  kind: action
  command: "/yosc:req/ssrecall_ex \"scene_a\" {scene_number}"
  params:
    - name: scene_number
      type: integer
      description: Scene number, 0-99

- id: scene_current_a
  label: Get Current Scene A Number
  kind: query
  command: "/yosc:req/sscurrent_ex \"scene_a\""
  params: []

- id: scene_recall_b
  label: Recall Scene B
  kind: action
  command: "/yosc:req/ssrecall_ex \"scene_b\" {scene_number}"
  params:
    - name: scene_number
      type: integer
      description: Scene number, 0-99

- id: scene_current_b
  label: Get Current Scene B Number
  kind: query
  command: "/yosc:req/sscurrent_ex \"scene_b\""
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source documents query operations but does not specify response payloads.
```

## Variables
```yaml
# UNRESOLVED: source lists settable parameters, but does not define separate variable objects.
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications are not stated in source.
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences are not stated in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings, interlocks, and power-on sequencing are not stated in source.
```

## Notes
OSC request format: `/yosc:req/<Action>/<OSC address>/<X>/<Y> <value>`. QLab examples omit type tags; other OSC controllers may require them. Up to four OSC remote controllers can connect to one DM3 Series console. DM3/DM3S maximum channel counts are documented in source.

<!-- UNRESOLVED: source does not state firmware compatibility, authentication credentials, response syntax, unsolicited events, or error recovery behavior. -->

## Provenance

```yaml
source_domains:
  - usa.yamaha.com
  - manual.yamaha.com
source_urls:
  - https://usa.yamaha.com/files/download/other_assets/2/2063222/DM3_osc_specs_v100_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/8/1626438/dm3_en_dl_a0.pdf
  - https://manual.yamaha.com/pa/mixers/dm3/rm/en-US/
  - https://usa.yamaha.com/files/download/other_assets/1/1525801/dm3_en_om_b1.pdf
retrieved_at: 2026-07-22T01:38:22.694Z
last_checked_at: 2026-07-22T08:03:56.345Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:03:56.345Z
matched_actions: 127
action_count: 127
confidence: medium
summary: "All 127 spec actions verified in source with exact wire-literal matches; complete 1:1 command coverage and transport parameters confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "authentication, unsolicited event behavior, response payloads, and safety procedures are not stated in source."
- "source documents query operations but does not specify response payloads."
- "source lists settable parameters, but does not define separate variable objects."
- "unsolicited notifications are not stated in source."
- "multi-step sequences are not stated in source."
- "safety warnings, interlocks, and power-on sequencing are not stated in source."
- "source does not state firmware compatibility, authentication credentials, response syntax, unsolicited events, or error recovery behavior."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
