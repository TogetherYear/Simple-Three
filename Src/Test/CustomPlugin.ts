import { Plugin } from '@/Core/Base';
import { TTest } from '@/Core/Decorators';
import * as THREE from 'three';
import { Mathf } from '@/Core/Utils';
import { CustomBox } from './CustomBox';
import { CustomSphere } from './CustomSphere';
import { CustomPlane } from './CustomPlane';

/**
 * Debug
 */
class CustomPlugin extends Plugin {
    @TTest.BindNumberProperty<CustomPlugin>(0.01, 3, 0.01, (instance, value) => {
        instance.ctx.Renderer.renderer.setPixelRatio(value);
    })
    private resolutionScale = 1;

    @TTest.BindFunction()
    private AddStatic() {
        new CustomPlane(this.ctx, {
            position: new THREE.Vector3(Math.random() * 16 - 8, Math.random() * 6, Math.random() * 16 - 8),
            rotate: new THREE.Vector3(Mathf.Deg2Rad * (Math.random() * 60 - 30), Mathf.Deg2Rad * (Math.random() * 60 - 30), Mathf.Deg2Rad * (Math.random() * 60 - 30)),
            scale: new THREE.Vector3(
                Mathf.Clamp(5, Number.MAX_SAFE_INTEGER, Math.random() * 5 + 5),
                Mathf.Clamp(0.05, Number.MAX_SAFE_INTEGER, Math.random() * 0.05 + 0.01),
                Mathf.Clamp(5, Number.MAX_SAFE_INTEGER, Math.random() * 5 + 5)
            )
        });
    }

    @TTest.BindFunction()
    private AddDynamic() {
        if (Math.random() < 0.5) {
            new CustomBox(this.ctx, {
                position: new THREE.Vector3(Math.random() * 12 - 6, Math.random() * 6 + 10, Math.random() * 12 - 6),
                rotate: new THREE.Vector3(Math.random() * 360, Math.random() * 360, Math.random() * 360),
                scale: new THREE.Vector3(
                    Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6),
                    Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6),
                    Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6)
                )
            });
        } else {
            const scale = Mathf.Clamp(0.4, Number.MAX_SAFE_INTEGER, Math.random() * 1.6);
            new CustomSphere(this.ctx, {
                position: new THREE.Vector3(Math.random() * 12 - 6, Math.random() * 6 + 10, Math.random() * 12 - 6),
                rotate: new THREE.Vector3(Math.random() * 360, Math.random() * 360, Math.random() * 360),
                scale: new THREE.Vector3(scale, scale, scale)
            });
        }
    }

    @TTest.BindFunction()
    private Refresh() {
        location.reload();
    }
}

export { CustomPlugin };
